// Question8XSSDemoFull.js
import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// ==================== QUESTION 8 ====================
/*
  Question 8: Security in Frontend
  - Explain XSS (Cross-Site Scripting)
  - How to prevent it in frontend development
  - Show unsafe vs safe rendering example

  Answer / Explanation:
  1. XSS occurs when malicious scripts are injected into webpages and executed in a user's browser.
     Example: <script>alert('Hacked')</script>
  2. As a frontend developer:
     - Never render raw HTML from untrusted sources using dangerouslySetInnerHTML
     - Sanitize input using libraries like DOMPurify
     - Escape HTML content when rendering user input
  3. This demo shows both unsafe (dangerouslySetInnerHTML) and safe (plain text) rendering
*/

// ==================== MAIN COMPONENT ====================
const Question8 = () => {
  const [userInput, setUserInput] = useState("");

  // ----------------- Unsafe Content Detection -----------------
  const isUnsafe = useMemo(() => {
    // Detect tags or javascript: to warn user
    const pattern = /<\s*(script|iframe|object|embed|img)[^>]*>|javascript:/i;
    return pattern.test(userInput);
  }, [userInput]);

  return (
    <div
      className="container py-4"
      style={{
        background: "linear-gradient(to right, #134547 0%, #134547 100%)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <h2 className="text-center mb-4" style={{ fontWeight: "700" }}>
        🔒 XSS Demo - Safe vs Unsafe (Enhanced)
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* ----------------- User Input ----------------- */}
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Type anything here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ fontSize: "1.1rem", padding: "10px" }}
          />

          {/* ---------------- Unsafe Rendering ---------------- */}
          <div
            className="card mb-4 p-3 shadow-lg"
            style={{
              backgroundColor: "#8B0000", // dark red
              border: "2px solid #ff4c4c",
              color: "#fff",
            }}
          >
            <h5 className="mb-2" style={{ fontWeight: "600" }}>
              Unsafe Rendering
            </h5>
            <p style={{ fontSize: "1rem" }}>
              {/* dangerouslySetInnerHTML executes raw HTML/scripts */}
              <span dangerouslySetInnerHTML={{ __html: userInput }} />
            </p>
            {isUnsafe ? (
              <div className="text-warning fw-bold">
                ⚠️ Unsafe content detected! This input may execute scripts or
                load external resources.
              </div>
            ) : (
              <small className="text-light">
                ⚠️ Unsafe! Scripts, if present, can run here.
              </small>
            )}
          </div>

          {/* ---------------- Safe Rendering ---------------- */}
          <div
            className="card p-3 shadow-lg"
            style={{
              backgroundColor: "#006400", // dark green
              border: "2px solid #32CD32",
              color: "#fff",
            }}
          >
            <h5 className="mb-2" style={{ fontWeight: "600" }}>
              Safe Rendering
            </h5>
            <p style={{ fontSize: "1rem" }}>
              {/* Safe: plain text rendering escapes HTML */}
              {userInput}
            </p>
            <small className="text-light">
              ✅ Safe! HTML tags are escaped, scripts won't execute.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question8;
