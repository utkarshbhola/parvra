import express from "express";
import authMiddleware from "../middleware/auth.js";
import supabase from "../config/supabase.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  // Try loading profile (but do NOT crash if missing)
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle(); // ← IMPORTANT: safer than .single()

  // Build response user object
  const responseUser = {
    id: req.user.id,
    email: req.user.email,
    ...profile, // will be {} if no profile exists
  };

  return res.json({ user: responseUser });
});

export default router;
