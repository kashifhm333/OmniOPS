import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../lib/api-client.js";
import { queryClient } from "../lib/query-client.js";

const AuthContext = createContext({
  user: null,
  activeOrg: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  switchOrg: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [activeOrg, setActiveOrg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    async function loadSession() {
      try {
        const profile = await apiClient.get("/auth/me");
        if (profile?.user) {
          setUser(profile.user);
          setActiveOrg(profile.organization || profile.activeOrg || null);
        }
      } catch (err) {
        setUser(null);
        setActiveOrg(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadSession();
  }, []);

  const login = async (email, password) => {
    const res = await apiClient.post("/auth/login", { email, password });
    setUser(res.user);
    setActiveOrg(res.organization || res.activeOrg || null);
    queryClient.clear();
    return res;
  };

  const register = async (payload) => {
    const res = await apiClient.post("/auth/register", payload);
    setUser(res.user);
    setActiveOrg(res.organization || res.activeOrg || null);
    queryClient.clear();
    return res;
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout", {});
    } catch {}
    setUser(null);
    setActiveOrg(null);
    queryClient.clear();
  };

  const switchOrg = (org) => {
    setActiveOrg(org);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeOrg,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        switchOrg
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
