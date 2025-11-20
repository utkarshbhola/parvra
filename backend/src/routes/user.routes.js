import express from "express";
import  authMiddleware  from "../middleware/auth.js";
import supabase from "../config/supabase.js";

const router = express.Router();

// -------------------------
// GET LOGGED-IN USER
// -------------------------
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------
// UPDATE PROFILE
// -------------------------
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { username, bio, profile_photo_url } = req.body;

    const { data, error } = await supabase
      .from("profiles")
      .update({ username, bio, profile_photo_url })
      .eq("id", req.user.id)
      .select();

    if (error) throw error;

    res.json({ message: "Profile updated", user: data[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
