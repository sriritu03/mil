const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// USER REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({ message: "User Registered Successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// USER LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ message: "Invalid password" });
        }

        res.json({ message: "Login Successful" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;