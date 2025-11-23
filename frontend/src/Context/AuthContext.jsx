import { createContext, useState, useEffect } from "react";
import API from "../api/AxiosInstance";
//eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  /* =============================
     FETCH USER FROM BACKEND
  ============================== */
  const fetchUser = async () => {
    try {
      const res = await API.get("/protected/me");
      setUser(res.data.user);
    } catch (err) {
      console.log("User fetch failed:", err);
      setUser(null);
    }
  };

  /* =============================
     LOGIN
  ============================== */
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);

    await fetchUser();
    return true;
  };

  /* =============================
     SIGNUP → AUTO LOGIN
  ============================== */
  const signup = async (email, password) => {
    // Step 1: Signup
    await API.post("/auth/signup", { email, password });

    // Step 2: Auto-login
    return await login(email, password);
  };

  /* =============================
     LOGOUT
  ============================== */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  /* =============================
     AUTO LOAD USER ON REFRESH
  ============================== */
  useEffect(() => {
    if (localStorage.getItem("token")) fetchUser();
    else setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
