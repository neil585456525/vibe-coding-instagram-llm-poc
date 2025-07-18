import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import crawlRoutes from "./routes/crawl";
import analyzeRoutes from "./routes/analyze";
import templatesRoutes from "./routes/templates";
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", crawlRoutes);
app.use("/api", analyzeRoutes);
app.use("/api", templatesRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDatabase();
    console.log("✓ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
