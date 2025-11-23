import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.js";  // <-- HERE
import userRoutes from "./routes/user.routes.js";
import profiles from "./routes/profiles.routes.js";
const app = express();

app.use(cors({
  origin: [
    "https://parvra.vercel.app",
    "http://localhost:5173",
    /\.vercel\.app$/      // allow all vercel preview domains
  ],
  credentials: true
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);  // <-- HERE
app.use("/user", userRoutes);
app.use("/profiles", profiles);
app.get("/", (req, res) => {
  res.send("Parvra Backend Running 🚀");
});

export default app;
