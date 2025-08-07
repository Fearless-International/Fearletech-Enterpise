require("dotenv").config();
const mongoose = require("mongoose");
const ContactForm = require("./models/ContactForm");

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected for Seeding"))
	.catch((err) => console.error("MongoDB Connection Error:", err));

// Sample Data
const seedData = [
	{
		name: "John Doe",
		email: "johndoe@example.com",
		phone: "+1234567890",
		message: "Hello, I need more information.",
	},
	{
		name: "Jane Smith",
		email: "janesmith@example.com",
		phone: "+9876543210",
		message: "I'd like to discuss a project.",
	},
];

// Insert Data
const seedDatabase = async () => {
	try {
		await ContactForm.deleteMany(); // Optional: Clear existing data
		await ContactForm.insertMany(seedData);
		console.log("Database Seeded Successfully!");
		mongoose.connection.close();
	} catch (error) {
		console.error("Error Seeding Database:", error);
		mongoose.connection.close();
	}
};

seedDatabase();
