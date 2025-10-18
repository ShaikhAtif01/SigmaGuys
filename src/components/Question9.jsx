// Question9.jsx
import React from "react";
import "./Question9.css";

// ==================== QUESTION 9 ====================
/*
  Question 9: Responsive Design & Mobile-First
  - How to ensure a mobile-first approach in frontend
  - Show example using CSS media queries for layout
  Answer / Explanation:
  1. Mobile-first approach: Start designing for small screens (mobile),
     then progressively enhance layout for tablets, desktops.
  2. Use relative units, flexible grids, and media queries.
  3. Benefits:
     • Faster loading on mobile
     • Better UX on small devices
     • Easier maintenance of responsive layout
*/

const Question9 = () => {
  return (
    <div id="question9-container">
      {/* ==================== Header ==================== */}
      <header id="question9-header">
        <h1>9. Responsive Design & Mobile-First</h1>
      </header>

      {/* ==================== Main Content ==================== */}
      <main id="question9-main">
        <div className="question9-card">Card 1</div>
        <div className="question9-card">Card 2</div>
        <div className="question9-card">Card 3</div>
        <div className="question9-card">Card 4</div>
      </main>

      {/* ==================== Footer ==================== */}
      <footer id="question9-footer">
        <p>Designed mobile-first, scales to tablet & desktop</p>
      </footer>
    </div>
  );
};

export default Question9;
