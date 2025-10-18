// src/context/AppContext.jsx
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("app_user")) || null
  );
  const [cartItems, setCartItems] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, cartItems, setCartItems }}>
      {children}
    </AppContext.Provider>
  );
};
