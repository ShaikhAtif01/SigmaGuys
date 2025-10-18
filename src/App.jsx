// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Product from "./components/Product";
import Question1 from "./components/Question1";
// import Question2 from "./components/Question2";
import Question3 from "./components/Question3";
import Question4 from "./components/Question4";
import Question5 from "./components/Question5";
// // import Question6 from "./components/Question6";
import Question7 from "./components/Question7";
import Question8 from "./components/Question8";
import Question9 from "./components/Question9";
import Counter from "./components/Question10";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("app_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("app_user");
    setUser(null);
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />

      <div className="mt-5 pt-5">
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Question1 />} />
          {/* <Route path="/question2" element={<Question2 />} /> */}
          <Route path="/question3" element={<Question3 />} />
          <Route path="/question4" element={<Question4 />} />
          <Route path="/question5" element={<Question5 />} />
          {/* <Route path="/question6" element={<Question6 />} /> */}
          <Route path="/question7" element={<Question7 />} />
          <Route path="/question8" element={<Question8 />} />
          <Route path="/question9" element={<Question9 />} />
          <Route path="/question10" element={<Counter />} />

          {/* Product page - protected */}
          <Route
            path="/product"
            element={
              user ? (
                <Product user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Login page */}
          <Route
            path="/login"
            element={
              user ? <Navigate to="/product" /> : <Login setUser={setUser} />
            }
          />
        </Routes>

        {/* <Question5 />
        <Question6 />
        <Question7 /> */}
        <Footer />
      </div>
    </>
  );
};

export default App;
