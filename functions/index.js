const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure nodemailer with Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'medhajha810@gmail.com',
    pass: 'qzvt vurn anoh fifc' // App password
  }
});

// Callable function to send contact form email
exports.sendContactEmail = functions.https.onCall(async (data, context) => {
  const { email, purpose, description } = data;

  // Basic validation
  if (!email || !purpose || !description) {
    throw new functions.https.HttpsError('invalid-argument', 'All fields are required.');
  }

  const mailOptions = {
    from: 'medhajha810@gmail.com',
    to: 'medhajha810@gmail.com',
    subject: `Portfolio Contact: ${purpose}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Purpose:</strong> ${purpose}</p>
      <p><strong>Description:</strong></p>
      <p>${description.replace(/\n/g, '<br>')}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email.');
  }
});
