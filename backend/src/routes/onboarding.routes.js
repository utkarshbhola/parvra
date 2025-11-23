import express from "express";
import authMiddleware from "../middleware/auth.js";
import supabase from "../config/supabase.js";

const router = express.Router();

/* ============================
   SAVE ONBOARDING DATA
=============================== */
router.put("/", authMiddleware, async (req, res) => {

  console.log("📥 Incoming Onboarding Request");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Decoded User:", req.user);

  const { username, bio, avatar } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    console.log("❌ ERROR: userId is undefined");
    return res.status(400).json({ error: "Invalid token or userId missing" });
  }

  if (!username) {
    console.log("❌ ERROR: Username missing");
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        username,
        bio: bio || null,
        profile_photo_url: avatar || null,
      })
      .eq("id", userId)
      .select();

    if (error) {
      console.log("❌ SUPABASE ERROR:", error.message);
      return res.status(400).json({ error: error.message });
    }

    console.log("✅ Updated Profile:", data);

    return res.json({
      message: "Onboarding saved",
      profile: data[0],
    });

  } catch (err) {
    console.log("❌ UNKNOWN BACKEND ERROR:", err.message);
    return res.status(400).json({ error: err.message });
  }
});


export default router;
