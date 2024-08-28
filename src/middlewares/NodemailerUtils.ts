import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS
  }
});

const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: 'JobMifi <timmyrocks17@gmail.com>',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmail;
