import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import connectDB from "./config/mongoose";
import cors from "cors";
import setupSwagger from "./swagger";
import companyRoutes from "./routes/company.routes";
import jobCategoryRoutes from "./routes/jobCategory.routes";
import jobCategoryMappingRoutes from "./routes/jobCategoryMapping.routes";
import userRoutes from "./routes/user.routes";

// Load environment variables
dotenv.config();

// Connect to MongoDB

const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", companyRoutes);
app.use("/api", jobCategoryRoutes);
app.use("/api", jobCategoryMappingRoutes);
app.use("/api", userRoutes);

connectDB().then((res) => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
});
