import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Question3.css";

const Question3 = () => {
  // ==================== QUESTION 3 ====================
  /*
    Question 3:
    JavaScript Event Handling
    1. Explain event delegation in JavaScript.
    2. Write a short code snippet that uses event delegation to handle clicks
       on multiple list items dynamically added to a <ul>.

    Answer / Detailed Explanation:
    - Event delegation is a technique where a single event listener is attached 
      to a parent element (like <ul>) instead of multiple child elements (<li>).
    - Inside the handler, we check event.target to determine which child was clicked.
    - Benefits:
      1. Works for dynamically added elements without adding new listeners.
      2. Reduces memory usage by having fewer listeners.
      3. Centralizes logic, easier to maintain.
    - Example in this file:
      * <ul> has a single onClick listener (line 52).
      * <li> items are dynamically added using addItem() function (line 41).
      * Active clicked item is highlighted using activeIndex state (line 54-66).
  */

  const [items, setItems] = useState(["Item 1", "Item 2"]); // Initial list items
  const [activeIndex, setActiveIndex] = useState(null); // Tracks clicked item

  // ==================== EVENT DELEGATION HANDLER ====================
  const handleClick = (e) => {
    if (e.target && e.target.tagName === "LI") {
      const index = parseInt(e.target.dataset.index);
      setActiveIndex(index); // Highlight clicked item
      alert(`You clicked on: ${e.target.innerText}`); // Feedback to user
    }
  };

  // ==================== DYNAMIC ITEM ADDITION ====================
  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems([...items, newItem]);
  };

  return (
    <div
      className="container my-5"
      style={{ minHeight: "100vh", backgroundColor: "#f0f4f4" }}
    >
      <div
        className="card shadow-lg p-3 custom-card"
        style={{
          borderTop: "5px solid #134547",
          backgroundColor: "#e8f0f0",
        }}
      >
        <div
          className="card-header text-white"
          style={{
            background: "linear-gradient(to right, #134547 0%, #134547 100%)",
          }}
        >
          <h3 className="mb-0">Event Delegation Example</h3>
        </div>
        <div className="card-body">
          <p className="lead">
            Click on any list item. New items can be added dynamically.
          </p>
          <button
            className="btn mb-3"
            style={{
              background: "linear-gradient(to right, #134547 0%, #134547 100%)",
              color: "#fff",
            }}
            onClick={addItem}
          >
            Add Item
          </button>

          {/* ==================== LIST WITH EVENT DELEGATION ==================== */}
          <ul
            className="list-group list-group-flush custom-list"
            onClick={handleClick} // Single listener handles all <li> clicks
          >
            {items.map((item, index) => (
              <li
                key={index}
                data-index={index} // Track index for active state
                className={`list-group-item list-group-item-action ${
                  activeIndex === index ? "active-item" : ""
                }`}
                style={{
                  cursor: "pointer",
                  backgroundColor: activeIndex === index ? "#134547" : "#fff",
                  color: activeIndex === index ? "#fff" : "#134547",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ==================== EVENT DELEGATION EXPLANATION ==================== */}
      {/*
        - Single click listener on <ul> handles all <li> clicks (line 52).
        - Dynamically added <li> elements do not need new listeners (line 41).
        - data-index attribute tracks which item was clicked (line 54-66).
        - activeIndex state highlights clicked item for UX feedback.
        - Event delegation reduces memory usage and centralizes logic.
      */}
    </div>
  );
};

export default Question3;
