const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Host = require("../models/host.model");

// Host signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const existingHost = await Host.findOne({
      $or: [{ email: email.trim().toLowerCase() }, { username: username.trim() }],
    });

    if (existingHost) {
      return res.status(400).json({ success: false, message: "Email or username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newHost = new Host({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    await newHost.save();

    res.status(201).json({
      success: true,
      user: {
        _id: newHost._id,
        username: newHost.username,
        email: newHost.email,
      },
    });
  } catch (error) {
    console.error("Host signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Host signin
exports.signin = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: "Both email/username and password are required" });
  }

  try {
    const host = await Host.findOne({
      $or: [{ email: emailOrUsername.trim().toLowerCase() }, { username: emailOrUsername.trim() }],
    });

    if (!host) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, host.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: host._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: { username: host.username, email: host.email },
    });
  } catch (error) {
    console.error("Host signin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
