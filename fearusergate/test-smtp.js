const nodemailer = require('nodemailer');

async function testConnection() {
  console.log('Testing SMTP connection with secure port...');
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: 'info@fearlessint.com',
      pass: 'Fear345**'
    },
    debug: true,
    logger: true
  });
  
  try {
    console.log('Verifying connection...');
    const verified = await transporter.verify();
    console.log('Server is ready:', verified);
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();