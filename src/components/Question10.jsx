// Question10CounterDebug.jsx
import React, { useState } from "react";

// ==================== QUESTION 10 ====================
/*
  Debugging Challenge:
  - Issue: Counter doesn't update correctly when calling setCount multiple times.
  - Explanation:
    • In React, state updates are asynchronous.
    • Using 'setCount(count + 1)' twice in the same render uses the same stale 'count' value.
    • Result: count increases by 1 instead of 2.
  - Solution:
    • Use functional updater: setCount(prev => prev + 1)
    • This ensures each update works on the latest state.
*/

function Counter() {
  //  React state hook
  const [count, setCount] = useState(0);

  // ===========================
  // Buggy Version (for reference)
  // ===========================
  /*
  function incrementBuggy() {
    //  Both calls use stale 'count' value
    setCount(count + 1);
    setCount(count + 1);
    // Result: increases by 1 instead of 2
  }
  */

  // ===========================
  // Corrected Version
  // ===========================
  function increment() {
    //  Functional updater ensures latest state
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    // Result: increases correctly by 2
  }

  // ===========================
  // Alternative Short Version
  // ===========================
  /*
  function incrementShort() {
    // Single call to increment by 2
    setCount((prev) => prev + 2);
  }
  */

  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "100px",
        fontFamily: "Arial",
        background: "linear-gradient(to right, #a0d8d8 0%, #c0f0f0 100%)",
        color: "#134547",
      }}
    >
      <h3>Counter Debugging Demo</h3>
      <p>
        Current Count: <strong>{count}</strong>
      </p>

      <button
        onClick={increment}
        style={{
          padding: "10px 20px",
          backgroundColor: "#134547",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px",
          transition: "all 0.2s ease",
        }}
      >
        +2
      </button>

      {/* Optional: show buggy button for demo */}
      {/*
      <button
        onClick={incrementBuggy}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        +2 (Buggy)
      </button>
      */}
    </div>
  );
}

export default Counter;
