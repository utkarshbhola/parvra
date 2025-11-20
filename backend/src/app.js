import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.js";  // <-- HERE
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);  // <-- HERE
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Parvra Backend Running 🚀");
});

export default app;
