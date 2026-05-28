import brevo from '@getbrevo/brevo'

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    console.log(
      '📩 Brevo API email sending started'
    )

    console.log('TO:', to)

    console.log(
      'BREVO_API_KEY exists:',
      Boolean(process.env.BREVO_API_KEY)
    )

    console.log(
      'EMAIL_FROM:',
      process.env.EMAIL_FROM
    )

    if (!to || !subject || !html) {
      return {
        success: false,
        message: 'Missing email data',
      }
    }

    const apiInstance =
      new brevo.TransactionalEmailsApi()

    apiInstance.authentications.apiKey.apiKey =
      process.env.BREVO_API_KEY

    const sendSmtpEmail =
      new brevo.SendSmtpEmail()

    sendSmtpEmail.subject = subject

    sendSmtpEmail.htmlContent = html

    sendSmtpEmail.sender = {
      name:
        process.env.EMAIL_FROM_NAME ||
        'GYM PRO',

      email: process.env.EMAIL_FROM,
    }

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ]

    const response =
      await apiInstance.sendTransacEmail(
        sendSmtpEmail
      )

    console.log(
      '✅ Email sent successfully:',
      response
    )

    return {
      success: true,
      message:
        'Email sent successfully',
    }
  } catch (error) {
    console.log(
      '❌ Brevo Error:',
      error
    )

    return {
      success: false,
      message:
        error.message ||
        'Email sending failed',
    }
  }
}

export default sendEmail