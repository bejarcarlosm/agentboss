'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type ConversationState = 'idle' | 'connecting' | 'connected' | 'recording' | 'transcribing' | 'review' | 'processing' | 'speaking' | 'error';

const MAX_MESSAGES_DEMO = 5;

const BACKEND_URL = process.env.NEXT_PUBLIC_VOICE_BACKEND_URL || 'https://voice11labs.agentboss.cl';
const API_KEY = process.env.NEXT_PUBLIC_VOICE_API_KEY || '';

// Silence detection config
const SILENCE_THRESHOLD = 0.015; // RMS level below which we consider silence
const SILENCE_DURATION_MS = 2000; // 2 seconds of silence to trigger transcription
const MIN_RECORDING_MS = 1000; // Minimum 1 second of recording before silence detection kicks in

function getMessageCount(): number {
  if (typeof window === 'undefined') return 0;
  const count = localStorage.getItem('agentboss_msg_count');
  return count ? parseInt(count, 10) : 0;
}

function incrementMessageCount(): number {
  const count = getMessageCount() + 1;
  localStorage.setItem('agentboss_msg_count', String(count));
  return count;
}

export function useVoiceChatStreaming(isLiveMode: boolean) {
  const [state, setState] = useState<ConversationState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [pendingTranscription, setPendingTranscription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [demoTimeoutReached, setDemoTimeoutReached] = useState(false);
  const [rateLimitReached, setRateLimitReached] = useState(false);

  const sessionIdRef = useRef<string | null>(null);
  const backendWsRef = useRef<WebSocket | null>(null);
  const streamingWsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playbackAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const isConnectingRef = useRef(false);
  const recordingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const silenceStartRef = useRef<number | null>(null);
  const recordingStartRef = useRef<number>(0);
  const silenceCheckRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const checkRateLimit = useCallback((): boolean => {
    if (isLiveMode) return false;
    return getMessageCount() >= MAX_MESSAGES_DEMO;
  }, [isLiveMode]);

  const connect = useCallback(async (agentId: string) => {
    if (isConnectingRef.current || sessionIdRef.current) return;

    try {
      isConnectingRef.current = true;
      setState('connecting');
      setError(null);

      if (checkRateLimit()) {
        setRateLimitReached(true);
        setState('error');
        setError('Has alcanzado el limite de mensajes de la demo. Contactanos para acceso completo.');
        isConnectingRef.current = false;
        return;
      }

      const capitalizedAgentName = agentId.charAt(0).toUpperCase() + agentId.slice(1);

      const sessionResponse = await fetch(`${BACKEND_URL}/api/chat/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY }),
        },
        body: JSON.stringify({
          agentName: capitalizedAgentName,
          llmProvider: 'groq',
        }),
      });

      if (!sessionResponse.ok) throw new Error('Failed to start session');

      const sessionData = await sessionResponse.json();
      sessionIdRef.current = sessionData.sessionId;

      const wsUrl = BACKEND_URL.replace('https://', 'wss://').replace('http://', 'ws://');
      console.log('[Voice] Session created:', sessionData.sessionId);
      console.log('[Voice] Opening chat WS');
      const backendWs = new WebSocket(`${wsUrl}/api/chat/ws?sessionId=${sessionIdRef.current}`);

      backendWs.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        console.log('[Voice] Backend msg:', msg.type, msg);

        switch (msg.type) {
          case 'connected':
            setState('connected');
            break;
          case 'thinking':
            setState('processing');
            break;
          case 'transcription':
            setCurrentTranscript(msg.text);
            // Only add message if not already present (avoids dupe when sent via text)
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === 'user' && last?.content === msg.text) return prev;
              if (!isLiveMode) incrementMessageCount();
              return [...prev, { role: 'user', content: msg.text }];
            });
            break;
          case 'ai_response':
            setMessages(prev => [...prev, { role: 'assistant', content: msg.text }]);
            setCurrentTranscript('');
            break;
          case 'speaking':
            if (streamingWsRef.current) {
              streamingWsRef.current.close();
              streamingWsRef.current = null;
            }
            if (msg.audioChunk) {
              setState('speaking');
              playAudio(msg.audioChunk);
            } else {
              setState('connected');
            }
            break;
          case 'error':
            if (msg.message === 'processing_failed' && messages.length > 0) {
              setState('connected');
            } else {
              setError(msg.message || 'Unknown error');
              setState('error');
            }
            break;
        }
      };

      backendWs.onerror = () => {
        setError('Error de conexion');
        setState('error');
      };

      backendWs.onclose = () => {
        if (state !== 'idle') setState('error');
      };

      backendWsRef.current = backendWs;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      setState('error');
    } finally {
      isConnectingRef.current = false;
    }
  }, [state, isLiveMode, checkRateLimit]);

  const stopMicrophone = useCallback(() => {
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }
    if (silenceCheckRef.current) {
      clearInterval(silenceCheckRef.current);
      silenceCheckRef.current = null;
    }
    silenceStartRef.current = null;
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsRecording(false);
    setAnalyser(null);
    analyserRef.current = null;
  }, []);

  const stopRecording = useCallback(() => {
    stopMicrophone();
    if (streamingWsRef.current) {
      streamingWsRef.current.close();
      streamingWsRef.current = null;
    }
    setState('connected');
  }, [stopMicrophone]);

  // Request transcription only (no AI processing)
  const requestTranscription = useCallback(() => {
    if (streamingWsRef.current && streamingWsRef.current.readyState === WebSocket.OPEN) {
      console.log('[Voice] Requesting transcribe_only');
      streamingWsRef.current.send(JSON.stringify({ type: 'transcribe_only' }));
      stopMicrophone();
      setState('transcribing');
    }
  }, [stopMicrophone]);

  const startRecording = useCallback(async () => {
    if (!sessionIdRef.current) {
      setError('No session available');
      return;
    }

    if (checkRateLimit()) {
      setRateLimitReached(true);
      setError('Has alcanzado el limite de mensajes de la demo.');
      return;
    }

    try {
      setState('recording');
      setIsRecording(true);
      setDemoTimeoutReached(false);
      setPendingTranscription(null);
      setCurrentTranscript('');

      if (!playbackAudioContextRef.current) {
        playbackAudioContextRef.current = new AudioContext();
      }
      if (playbackAudioContextRef.current.state === 'suspended') {
        await playbackAudioContextRef.current.resume();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 16000 },
      });

      mediaStreamRef.current = stream;

      const wsUrl = BACKEND_URL.replace('https://', 'wss://').replace('http://', 'ws://');
      const streamingWsUrl = `${wsUrl}/api/streaming/ws?sessionId=${sessionIdRef.current}`;
      console.log('[Voice] Opening streaming WS:', streamingWsUrl);
      const streamingWs = new WebSocket(streamingWsUrl);

      streamingWs.onopen = () => {
        console.log('[Voice] Streaming WS connected');
      };

      streamingWs.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          console.log('[Voice] Streaming msg:', msg);
          const msgType = msg.type || msg.message_type;

          if (msgType === 'transcription_ready') {
            // Transcription received - show for review
            if (msg.text && msg.text.trim().length > 0) {
              setPendingTranscription(msg.text.trim());
              setCurrentTranscript(msg.text.trim());
              setState('review');
            } else {
              // Empty transcription - go back to connected
              setPendingTranscription(null);
              setState('connected');
            }
          } else if ((msgType === 'partial_transcript' || msgType === 'transcript') && msg.text) {
            setCurrentTranscript(msg.text);
          }
        } catch {
          console.log('[Voice] Streaming raw data:', e.data);
        }
      };

      streamingWs.onerror = (err) => {
        console.error('[Voice] Streaming WS error:', err);
        setError('Error en streaming de audio');
      };

      streamingWs.onclose = (ev) => {
        console.log('[Voice] Streaming WS closed:', ev.code, ev.reason);
      };

      streamingWsRef.current = streamingWs;

      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 256;
      analyserNode.smoothingTimeConstant = 0.8;
      setAnalyser(analyserNode);
      analyserRef.current = analyserNode;

      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      let audioChunkCount = 0;
      processor.onaudioprocess = (e) => {
        if (!streamingWs || streamingWs.readyState !== WebSocket.OPEN) {
          if (audioChunkCount === 0) console.log('[Voice] WS not open, skipping audio. State:', streamingWs?.readyState);
          return;
        }

        const inputData = e.inputBuffer.getChannelData(0);
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        streamingWs.send(pcmData.buffer);
        audioChunkCount++;
        if (audioChunkCount === 1 || audioChunkCount % 50 === 0) {
          console.log(`[Voice] Audio chunks sent: ${audioChunkCount}`);
        }
      };

      source.connect(analyserNode);
      analyserNode.connect(processor);
      processor.connect(audioContext.destination);
      scriptProcessorRef.current = processor;

      // Silence detection interval
      recordingStartRef.current = Date.now();
      silenceStartRef.current = null;

      silenceCheckRef.current = setInterval(() => {
        const node = analyserRef.current;
        if (!node) return;

        // Don't check silence during first second of recording
        if (Date.now() - recordingStartRef.current < MIN_RECORDING_MS) return;

        const dataArray = new Float32Array(node.frequencyBinCount);
        node.getFloatTimeDomainData(dataArray);
        const rms = Math.sqrt(dataArray.reduce((sum, val) => sum + val * val, 0) / dataArray.length);

        if (rms < SILENCE_THRESHOLD) {
          if (!silenceStartRef.current) {
            silenceStartRef.current = Date.now();
          } else if (Date.now() - silenceStartRef.current >= SILENCE_DURATION_MS) {
            console.log('[Voice] Silence detected, requesting transcription');
            requestTranscription();
          }
        } else {
          silenceStartRef.current = null;
        }
      }, 200); // Check every 200ms

      // Max timeout for demo/live mode
      const timeout = isLiveMode ? 300000 : 30000;
      recordingTimeoutRef.current = setTimeout(() => {
        setDemoTimeoutReached(true);
        // On timeout, also request transcription instead of just stopping
        requestTranscription();
      }, timeout);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Recording failed');
      setState('error');
      setIsRecording(false);
    }
  }, [stopMicrophone, requestTranscription, isLiveMode, checkRateLimit]);

  // Confirm and send the pending transcription
  const confirmSend = useCallback(async () => {
    if (!pendingTranscription) return;
    const text = pendingTranscription;
    setPendingTranscription(null);
    setCurrentTranscript('');
    // Close streaming WS since we're done with it
    if (streamingWsRef.current) {
      streamingWsRef.current.close();
      streamingWsRef.current = null;
    }
    await sendTextMessage(text);
  }, [pendingTranscription]);

  // Cancel pending transcription and go back to connected
  const cancelTranscription = useCallback(() => {
    setPendingTranscription(null);
    setCurrentTranscript('');
    if (streamingWsRef.current) {
      streamingWsRef.current.close();
      streamingWsRef.current = null;
    }
    setState('connected');
  }, []);

  // Legacy sendMessage - now triggers transcribe_only flow
  const sendMessage = useCallback(() => {
    requestTranscription();
  }, [requestTranscription]);

  const sendTextMessage = useCallback(async (text: string) => {
    if (!sessionIdRef.current) {
      setError('No session available');
      return;
    }

    if (checkRateLimit()) {
      setRateLimitReached(true);
      setError('Has alcanzado el limite de mensajes de la demo.');
      return;
    }

    try {
      setState('processing');
      setMessages(prev => [...prev, { role: 'user', content: text }]);

      const response = await fetch(`${BACKEND_URL}/api/chat/stream-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'X-API-Key': API_KEY }),
        },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          message: text,
        }),
      });

      if (!response.ok) throw new Error('Failed to send text message');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      setState('connected');
    }
  }, [isLiveMode, checkRateLimit]);

  const disconnect = useCallback(() => {
    stopRecording();
    if (backendWsRef.current) {
      backendWsRef.current.close();
      backendWsRef.current = null;
    }
    if (playbackAudioContextRef.current) {
      playbackAudioContextRef.current.close();
      playbackAudioContextRef.current = null;
    }
    sessionIdRef.current = null;
    isConnectingRef.current = false;
    setState('idle');
    setMessages([]);
    setCurrentTranscript('');
    setPendingTranscription(null);
    setError(null);
  }, [stopRecording]);

  const playAudio = useCallback(async (base64Audio: string) => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes.buffer], { type: 'audio/mpeg' });
        const blobUrl = URL.createObjectURL(blob);
        const audio = new Audio(blobUrl);

        audio.onended = () => { setState('connected'); URL.revokeObjectURL(blobUrl); };
        audio.onerror = () => { setState('connected'); URL.revokeObjectURL(blobUrl); };

        audio.play().catch(() => { setState('connected'); URL.revokeObjectURL(blobUrl); });
      } else {
        if (!playbackAudioContextRef.current) {
          playbackAudioContextRef.current = new AudioContext();
        }
        const audioContext = playbackAudioContextRef.current;
        if (audioContext.state === 'suspended') await audioContext.resume();

        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const audioBuffer = await audioContext.decodeAudioData(bytes.buffer);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.onended = () => setState('connected');
        source.start(0);
      }
    } catch {
      setState('connected');
    }
  }, []);

  useEffect(() => {
    return () => { disconnect(); };
  }, [disconnect]);

  return {
    state,
    messages,
    currentTranscript,
    pendingTranscription,
    error,
    connect,
    disconnect,
    startRecording,
    stopRecording,
    sendMessage,
    sendTextMessage,
    confirmSend,
    cancelTranscription,
    isRecording,
    analyser,
    demoTimeoutReached,
    rateLimitReached,
    remainingMessages: isLiveMode ? Infinity : Math.max(0, MAX_MESSAGES_DEMO - getMessageCount()),
  };
}
