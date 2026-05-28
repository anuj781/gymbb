import {
  TransactionalEmailsApi,
  SendSmtpEmail,
} from '@getbrevo/brevo'

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log('📩 Brevo API email sending started')
    console.log('TO:', to)
    console.log('BREVO_API_KEY exists:', Boolean(process.env.BREVO_API_KEY))
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM)
    console.log('EMAIL_FROM_NAME:', process.env.EMAIL_FROM_NAME)

    if (!to || !subject || !html) {
      return {
        success: false,
        message: 'Missing email data',
      }
    }

    if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM) {
      return {
        success: false,
        message: 'BREVO_API_KEY or EMAIL_FROM missing in environment variables',
      }
    }

    const apiInstance = new TransactionalEmailsApi()

    apiInstance.authentications.apiKey.apiKey =
      process.env.BREVO_API_KEY

    const sendSmtpEmail = new SendSmtpEmail()

    sendSmtpEmail.subject = subject
    sendSmtpEmail.htmlContent = html

    sendSmtpEmail.sender = {
      name: process.env.EMAIL_FROM_NAME || 'GYM PRO',
      email: process.env.EMAIL_FROM,
    }

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ]

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail)

    console.log('✅ Brevo API email sent:', response?.body || response)

    return {
      success: true,
      message: 'Email sent successfully',
    }
  } catch (error) {
    console.log('❌ Brevo API Error Message:', error.message)
    console.log('❌ Brevo API Error Body:', error.body)
    console.log('❌ Brevo API Full Error:', error)

    return {
      success: false,
      message:
        error.body?.message ||
        error.message ||
        'Email failed',
    }
  }
}

export default sendEmail