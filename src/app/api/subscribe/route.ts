import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Playhouse <noreply@playhouseec.com>"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "vaplayhouse@gmail.com"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // 1. Send Welcome Email to User (Spanish only, light mode, Google Fonts, logo)
    const welcomeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="color-scheme" content="light">
          <meta name="supported-color-schemes" content="light">
          <title>Bienvenido a Playhouse</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; -webkit-font-smoothing: antialiased; }
            .wrapper { width: 100%; padding: 40px 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .header { background-color: #5C1010; padding: 40px 20px; text-align: center; }
            .header img { display: block; margin: 0 auto; width: 160px; max-width: 100%; height: auto; border: 0; outline: none; }
            .content { padding: 40px 30px; line-height: 1.6; text-align: center; }
            h2 { font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; color: #18181b; margin-top: 0; font-size: 26px; margin-bottom: 16px; text-align: center; }
            p { margin: 0 0 16px; font-size: 16px; color: #3f3f46; text-align: center; }
            .btn-wrapper { text-align: center; margin-top: 24px; margin-bottom: 8px; }
            .btn { display: inline-block; background-color: #5C1010; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 30px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; border: 0; mso-padding-alt: 14px 32px; }
            .btn:hover { background-color: #7a1515 !important; }
            .footer { background-color: #fafafa; padding: 24px; text-align: center; font-size: 13px; color: #71717a; border-top: 1px solid #f4f4f5; }
            @media only screen and (max-width: 600px) {
              .content { padding: 28px 20px !important; }
              .header { padding: 28px 16px !important; }
              h2 { font-size: 22px !important; }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <img src="https://playhouseec.com/media/logo%20para%20fondo%20oscuro.png" alt="Playhouse" width="160" />
              </div>
              <div class="content">
                <h2>¡El escenario está listo! Bienvenido.</h2>
                <p>Gracias por suscribirte a los recursos de Playhouse. Estamos felices de tenerte en nuestra comunidad de educadores y mentes creativas.</p>
                <p>¡Tus materiales educativos ya están completamente desbloqueados! Puedes acceder a todos los Activity Kits, canciones y videos directamente en nuestro sitio web.</p>
                <div class="btn-wrapper">
                  <a href="https://playhouseec.com#materials" class="btn">Explorar Materiales</a>
                </div>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Playhouse Educational Theatre. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // 2. Send Admin Notification Email (Spanish only, light mode, centered, logo)
    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="color-scheme" content="light">
          <meta name="supported-color-schemes" content="light">
          <title>Nuevo suscriptor</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
            body { font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f5f5; color: #18181b; margin: 0; padding: 40px 20px; text-align: center; }
            .card { background: #ffffff; padding: 28px; border-radius: 12px; border: 1px solid #e4e4e7; max-width: 500px; margin: 0 auto; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
            .header { background-color: #5C1010; padding: 24px 20px; border-radius: 12px 12px 0 0; }
            .header img { display: block; margin: 0 auto; width: 120px; max-width: 100%; height: auto; border: 0; outline: none; }
            .content { padding: 28px; }
            h2 { color: #5C1010; margin-top: 0; font-size: 20px; font-weight: 600; text-align: center; }
            p { font-size: 16px; line-height: 1.5; color: #3f3f46; margin: 0 0 14px; text-align: center; }
            .email-box { font-size: 18px; font-weight: 600; color: #18181b; background: #fafafa; padding: 12px; border-radius: 8px; border: 1px solid #e4e4e7; margin: 16px 0; word-break: break-all; text-align: center; }
            .meta { margin-top: 20px; font-size: 13px; color: #71717a; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <img src="https://playhouseec.com/media/logo%20para%20fondo%20oscuro.png" alt="Playhouse" width="120" />
            </div>
            <div class="content">
              <h2>¡Nuevo suscriptor! 🎉</h2>
              <p>Un usuario acaba de desbloquear los recursos educativos y se suscribió con el siguiente correo:</p>
              <div class="email-box">${email}</div>
              <div class="meta">
                Enviado el: ${new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" })} (Hora de Ecuador)
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send emails in parallel
    await Promise.all([
      // To User
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "¡Bienvenido a la familia Playhouse! 🎭",
        html: welcomeHtml,
      }),
      // To Admin
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Nuevo suscriptor: ${email} 🎟️`,
        html: adminHtml,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Subscription Error:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
