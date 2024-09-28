import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import connectDB from "./config/mongoose";
import cors from "cors";
import setupSwagger from "./swagger";

// Load environment variables
dotenv.config();

// Connect to MongoDB
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Allow credentials if needed
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

// Routes
app.use("/api/auth", authRoutes);

connectDB().then((res) => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
});
