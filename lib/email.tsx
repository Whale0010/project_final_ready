import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendVerificationEmail(email: string, userId: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?id=${userId}`

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your AMED Account",
    html: `
      <h1>Welcome to AMED</h1>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error("Email sending failed:", error)
    throw error
  }
}

export async function sendContactReply(email: string, message: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "AMED - We received your message",
    html: `<p>${message}</p>`,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error("Email sending failed:", error)
  }
}
