const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// Import models
const User = require("./models/User");
const Vendor = require("./models/Vendor");
const Admin = require("./models/Admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/recyconnect")
  .then(() => console.log("✅ Database Connected"))
  .catch(err => console.log(err));

// ------------------ TEST ROUTES ------------------

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/test", (req, res) => {
  res.send("Backend is working");
});

// ------------------ USER APIs ------------------

// Register User
app.post("/api/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.send({ message: "User Registered Successfully" });

  } catch (error) {
    res.status(500).send({ message: "Error registering user" });
  }
});

// Login User
app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send({ message: "Invalid password" });
    }

    res.send({ message: "Login Success", user });

  } catch (error) {
    res.status(500).send({ message: "Error logging in" });
  }
});

// ------------------ VENDOR APIs ------------------

// Register Vendor
app.post("/api/vendor/register", async (req, res) => {
  try {
    const { name, email, password, company } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.send({ message: "Vendor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = new Vendor({
      name,
      email,
      password: hashedPassword,
      company
    });

    await vendor.save();

    res.send({ message: "Vendor Registered Successfully" });

  } catch (error) {
    res.status(500).send({ message: "Error registering vendor" });
  }
});

// Login Vendor
app.post("/api/vendor/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.send({ message: "Vendor not found" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);

    if (!isMatch) {
      return res.send({ message: "Invalid password" });
    }

    res.send({ message: "Login Success", vendor });

  } catch (error) {
    res.status(500).send({ message: "Error logging in" });
  }
});

// ------------------ ADMIN APIs ------------------

// Admin Login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.send({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.send({ message: "Invalid password" });
    }

    res.send({ message: "Admin Login Success", admin });

  } catch (error) {
    res.status(500).send({ message: "Error logging in" });
  }
});

// ------------------ START SERVER ------------------

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});