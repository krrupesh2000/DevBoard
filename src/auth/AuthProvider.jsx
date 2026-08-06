import { useState } from "react";

import AuthContext from "./AuthContext";

const STORAGE_KEY = "devboard-auth";

const DEMO_USER = {
  id: "user-1",
  name: "Rupesh Kumar",
  email: "krrupesh2000@gmail.com",
};

const DEMO_PASSWORD = "devboard123";

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    const parsedUser = JSON.parse(storedUser);

    const isValidUser =
      typeof parsedUser === "object" &&
      parsedUser !== null &&
      typeof parsedUser.id === "string" &&
      typeof parsedUser.name === "string" &&
      typeof parsedUser.email === "string";

    if (!isValidUser) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsedUser;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const isAuthenticated = Boolean(user);

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== DEMO_USER.email || password !== DEMO_PASSWORD) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const authenticatedUser = { ...DEMO_USER };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));

    setUser(authenticatedUser);

    return {
      success: true,
    };
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
