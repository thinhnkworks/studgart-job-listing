import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tranthanhloi13082003@gmail.com",
      pass: "twhc luxo wrzk glkb",
    },
  });

  const mailOptions = {
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email");
  }
};
