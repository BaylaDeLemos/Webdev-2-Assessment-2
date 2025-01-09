import express from "express"; // Import express
import User from "../Modules/userModel.js"; // Import user model
const router = express.Router(); // Create a router

// Handle POST request to /users (create a new user)
router.post("/", async (req, res) => {
  const { firstn, lastn, email, password } = req.body;
  try {
    const user = new User({ firstn, lastn, email, password });
    await user.save(); // Replace newUser with user
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Handle POST request to /users/login (login a user)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; // Export the router