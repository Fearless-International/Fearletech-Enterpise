const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
	type: { type: String, required: true }, // e.g., "Phone", "Email", "Address"
	value: { type: [String], required: true },
});

module.exports = mongoose.model("contact", ContactSchema);
