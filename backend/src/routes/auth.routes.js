import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  return res.json({ message: "Signup successful. Check your email!", user: data });
});

// LOGIN
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
    token: data.session.access_token,
    refreshToken: data.session.refresh_token,
    user: data.user,
  });
});

export default router;
