import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

dotenv.config();
dbConnection();

const app = express();

// ✅ Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS
app.use(
cors({
origin: true, // or process.env.CLIENT_URL
credentials: true,
})
);

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ✅ API routes (must come FIRST)
app.use("/api", routes);

/* =========================
✅ SERVE FRONTEND (VITE)
========================= */

// Serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

// Safe fallback for React routes (NO regex issues)
app.get("*", (req, res, next) => {
if (req.path.startsWith("/api")) return next();
res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

/* ========================= */

// ✅ Error handlers
app.use(routeNotFound);
app.use(errorHandler);

// ✅ CRITICAL FOR RAILWAY
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
console.log(`Server running on port ${PORT}`);
});
