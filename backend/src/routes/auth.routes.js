import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

/* ============================
   SIGNUP
=============================== */
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  // handle unverified email case
  const userId = data.user?.id;
  if (!userId) {
    return res.json({
      message: "Signup successful — verify your email",
      stage: "email_verification",
    });
  }

  // insert profile
  await supabase.from("profiles").insert([
    {
      id: userId,
      email,
      username: null,
      bio: null,
      profile_photo_url: null,
    },
  ]);

  return res.json({
    message: "Signup completed!",
    user: data.user,
  });
});


/* ============================
   LOGIN
=============================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  return res.json({
    message: "Login successful",
    token: data.session.access_token,       // JWT
    refreshToken: data.session.refresh_token,
    user: data.user,
  });
});

export default router;
