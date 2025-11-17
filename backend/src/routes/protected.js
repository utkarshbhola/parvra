import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

export default router;
