import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
// Connect to MongoDB
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
