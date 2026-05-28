import nodemailer from 'nodemailer'

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log('📩 Email sending started')
    console.log('TO:', to)
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST)
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT)
    console.log('EMAIL_USER:', process.env.EMAIL_USER)
    console.log('EMAIL_PASS exists:', Boolean(process.env.EMAIL_PASS))
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM)

    if (!to || !subject || !html) {
      return {
        success: false,
        message: 'Missing email data',
      }
    }

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.EMAIL_FROM
    ) {
      return {
        success: false,
        message:
          'EMAIL_USER, EMAIL_PASS or EMAIL_FROM missing in environment variables',
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      requireTLS: true,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      connectionTimeout: 60000,
      greetingTimeout: 60000,
      socketTimeout: 60000,
    })

    const info = await transporter.sendMail({
      from: `"GYM PRO" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    })

    console.log('✅ Email sent:', info.messageId)

    return {
      success: true,
      message: 'Email sent successfully',
    }
  } catch (error) {
    console.log('❌ Email Error Message:', error.message)
    console.log('❌ Email Error Code:', error.code)
    console.log('❌ Email Error Response:', error.response)
    console.log('❌ Full Email Error:', error)

    return {
      success: false,
      message:
        error.response ||
        error.message ||
        'Email failed',
    }
  }
}

export default sendEmail