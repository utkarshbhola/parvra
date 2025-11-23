import express from "express";
import authMiddleware from "../middleware/auth.js";
import supabase from "../config/supabase.js";

const router = express.Router();

router.put("/update", authMiddleware, async (req, res) => {
  const { bio } = req.body;
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("profiles")
    .update({ bio })
    .eq("id", userId)
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data[0]);
});

export default router;
