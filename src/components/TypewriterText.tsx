import { useState, useEffect } from "react";

interface TypewriterTextProps {
  children: string;
  speed?: number;
  delay?: number;
  className?: string;
  highlightWord?: string;
  highlightUrl?: string;
}

const TypewriterText = ({ 
  children, 
  speed = 30, 
  delay = 0,
  className = "",
  highlightWord = "Agentboss.cl",
  highlightUrl = "https://agentboss.cl"
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  const fullText = children;

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [fullText, speed, delay]);

  // Render text with highlighted word
  const renderText = (text: string) => {
    if (!highlightWord) return text;
    
    const parts = text.split(highlightWord);
    const includesHighlight = text.includes(highlightWord);
    
    if (!includesHighlight) return text;

    return (
      <>
        {parts[0]}
        <a 
          href={highlightUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent hover:from-emerald-400 hover:to-blue-400 transition-all"
        >
          {highlightWord}
        </a>
        {parts[1]}
      </>
    );
  };

  return (
    <span className={className}>
      {renderText(displayedText)}
      {!isComplete && (
        <span className="inline-block w-0.5 h-[1em] bg-foreground/70 animate-pulse ml-0.5 align-middle" />
      )}
    </span>
  );
};

export default TypewriterText;
