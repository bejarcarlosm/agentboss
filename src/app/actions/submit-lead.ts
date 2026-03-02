'use server'

interface LeadData {
  name: string
  phone: string
  company_name: string
  website: string | null
  project_description: string
  role_type: string
  budget_capacity: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function submitLeadAction(data: LeadData): Promise<{ success: boolean; error?: string }> {
  if (!data.name || !data.phone || !data.company_name || !data.project_description || !data.role_type || !data.budget_capacity) {
    return { success: false, error: 'Todos los campos obligatorios deben ser completados.' }
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured')
    return { success: true }
  }

  const notificationEmails = (process.env.NOTIFICATION_EMAIL || 'bejarcarlos@gmail.com')
    .split(',')
    .map(e => e.trim())

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'AgentBoss <onboarding@resend.dev>',
        to: notificationEmails,
        subject: `Nuevo Lead AgentBoss: ${data.name} - ${data.company_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #2dd4bf; margin: 0;">Nuevo Lead - AgentBoss.cl</h2>
            </div>
            <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Nombre:</td><td style="padding: 8px 0; color: #475569;">${escapeHtml(data.name)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">WhatsApp:</td><td style="padding: 8px 0; color: #475569;">${escapeHtml(data.phone)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Empresa:</td><td style="padding: 8px 0; color: #475569;">${escapeHtml(data.company_name)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Web:</td><td style="padding: 8px 0; color: #475569;">${escapeHtml(data.website || 'No proporcionado')}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Proyecto:</td><td style="padding: 8px 0; color: #475569;">${escapeHtml(data.project_description)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Rol:</td><td style="padding: 8px 0; color: #475569;">${escapeHtml(data.role_type)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #334155;">Presupuesto:</td><td style="padding: 8px 0; color: #475569;">${escapeHtml(data.budget_capacity)}</td></tr>
              </table>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">Enviado desde agentboss.cl el ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</p>
            </div>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error('Resend API error:', response.status, errorData)
    }

    return { success: true }
  } catch (err) {
    console.error('Email notification error:', err)
    return { success: true }
  }
}
