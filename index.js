import express from "express"; // Import express
import mongoose from "mongoose"; // Import mongoose
import dotenv from "dotenv"; // Import dotenv
import cors from "cors"; // Import cors
import userRoutes from "./routes/userRoutes.js"; // Import user routes
dotenv.config(); // Load environment variables

// Create an instance of express
const app = express();
const port = 4000;

// Middleware
app.use(cors());

// Parse incoming JSON data
app.use(express.json());
app.use("/api/user", userRoutes);

// Connect to MongoDB
const dbURI = process.env.DB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

connectDB(); // Connect to MongoDB

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});