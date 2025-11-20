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

  // 1. Create user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  const user = data.user;

  // 2. Create profile record ONLY if signup succeeded
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: user.id,             // SAME AS auth.users.uid
      email: user.email,
      username: null,
      bio: null,
      profile_photo_url: null,
      created_at: new Date().toISOString(),
    },
  ]);

  if (profileError)
    return res.status(500).json({ error: "User created but profile failed: " + profileError.message });

  return res.json({
    message: "Signup successful. Check your email!",
    user: user,
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
