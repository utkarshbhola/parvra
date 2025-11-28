import express from "express";
import authMiddleware from "../middleware/auth.js";
import supabase from "../config/supabase.js";

const router = express.Router();
router.get("/check", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();  // <-- FIXED

  if (error) {
    console.log("Supabase error:", error);
    return res.status(400).json({ error: error.message });
  }

  const exists = !!profile;  // profile = null if no row exists

  res.json({ exists });
});


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
router.put("/onboarding", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { username, bio, avatar } = req.body;

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      username,
      bio,
      profile_photo_url: avatar,
      Phone_number: "0000000000",
      email: req.user.email,
      created_at: new Date(),
    })
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ success: true, profile: data });
});

export default router;
