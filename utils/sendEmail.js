import axios from 'axios'

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log('📩 Brevo REST API email sending started')
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

    const { data } = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: process.env.EMAIL_FROM_NAME || 'GYM PRO',
          email: process.env.EMAIL_FROM,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          accept: 'application/json',
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json',
        },
        timeout: 30000,
      }
    )

    console.log('✅ Brevo email sent:', data)

    return {
      success: true,
      message: 'Email sent successfully',
    }
  } catch (error) {
    console.log('❌ Brevo REST API Error Message:', error.message)
    console.log('❌ Brevo REST API Error Status:', error.response?.status)
    console.log('❌ Brevo REST API Error Data:', error.response?.data)

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        'Email failed',
    }
  }
}

export default sendEmail