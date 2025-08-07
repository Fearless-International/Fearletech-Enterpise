const mongoose = require("mongoose");

const ContactFormSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	message: { type: String, required: true },
	submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ContactForm", ContactFormSchema);
