const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");

// VENDOR REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, company } = req.body;

        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.json({ message: "Vendor already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const vendor = new Vendor({
            name,
            email,
            password: hashedPassword,
            company
        });

        await vendor.save();

        res.json({ message: "Vendor Registered Successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// VENDOR LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const vendor = await Vendor.findOne({ email });

        if (!vendor) {
            return res.json({ message: "Vendor not found" });
        }

        const isMatch = await bcrypt.compare(password, vendor.password);

        if (!isMatch) {
            return res.json({ message: "Invalid password" });
        }

        res.json({ message: "Login Successful" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;