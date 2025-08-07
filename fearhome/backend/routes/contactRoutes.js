const express = require("express");
const Contact = require("../models/contact");
const router = express.Router();

// GET all contact information
router.get("/", async (req, res) => {
	try {
		const contacts = await Contact.find();
		res.json(contacts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// POST new contact info
router.post("/", async (req, res) => {
	const { type, value } = req.body;
	if (!type || !value) return res.status(400).json({ message: "All fields are required" });

	try {
		const newContact = new Contact({ type, value });
		await newContact.save();
		res.status(201).json(newContact);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
