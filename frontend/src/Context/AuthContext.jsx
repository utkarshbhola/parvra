import { createContext, useState, useEffect } from "react";
import API from "../api/AxiosInstance";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // <-- FIXED

  async function fetchUser() {
    try {
      const res = await API.get("/protected/me");
        setUser(res.data.user);

    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);

    // after saving token, fetch user
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
