const express = require("express");
const ContactForm = require("../models/ContactForm");
const sendEmail = require("../utils/sendEmail");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Save form data to MongoDB
    const newContact = new ContactForm({ name, email, phone, message });
    await newContact.save();

    // 📩 Admin Email
    const adminSubject = `New Contact Form Submission from ${name}`;
    const adminMessage = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
    await sendEmail("info@fearlessint.com", adminSubject, adminMessage, true);

    // 📩 User Confirmation Email
    const userSubject = `Thank You for Contacting Us, ${name}!`;
    const userMessage = `
      <h2>Thank you for reaching out, ${name}!</h2>
      <p>We've received your message and will get back to you shortly.</p>
      <p><strong>Your Message:</strong> ${message}</p>
      <p>We'll contact you at <strong>${email}</strong> or <strong>${phone}</strong> soon!</p>
    `;
    await sendEmail(email, userSubject, userMessage, true);

    res.status(201).json({ message: "Form submitted successfully, emails sent!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
