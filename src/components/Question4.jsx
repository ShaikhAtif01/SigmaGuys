// Question4.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Question4.css";

// ==================== QUESTION 4 ====================
/*
  Question 4: React Debounced Search
  1. Explain what debounce is and why it is useful in React.
  2. Implement a debounced search input that fetches GitHub users dynamically.
  3. Show loading feedback and clickable search results.
*/

// ==================== CUSTOM DEBOUNCE HOOK ====================
/*
  // Reference: Question 4 
  // Answer / Detailed Explanation:
  useDebounce hook:
  - Delays updates to the search input until user stops typing for 500ms.
  - Avoids excessive API calls on every keystroke.
  - Returns debouncedValue which triggers the search effect.
  - Benefits:
    1. Reduces server load .
    2. Prevents flickering or multiple re-renders .
    3. Improves user experience by waiting for user pause.
*/
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // Cleanup previous timeout
  }, [value, delay]);

  return debouncedValue;
};

const Question4 = () => {
  const [query, setQuery] = useState(""); // User input (line 38)
  const [loading, setLoading] = useState(false); // Loading spinner visibility (line 39)
  const [results, setResults] = useState([]); // Stores API search results (line 40)

  const debouncedQuery = useDebounce(query, 500); // Debounced input (line 42)

  // ==================== API FETCH ====================
  /*
    // Reference: Question 4 (lines 44-63)
    // Answer / Explanation:
    useEffect triggers whenever debouncedQuery changes:
    - Checks if input is not empty
    - Sets loading state (line 47)
    - Fetches GitHub users using public API (lines 48-55)
    - Updates results or handles errors (lines 49-55)
    - Benefits:
      1. Real-time search without excessive requests
      2. Smooth UX with loading indicator
      3. Avoids server overload due to rapid typing
  */
  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      fetch(`https://api.github.com/search/users?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.items || []);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  // ==================== HANDLE SELECT ====================
  /*
    // Reference: Question 4 (lines 65-69)
    // Answer / Explanation:
    handleSelect opens selected user's GitHub profile in a new tab.
    - Improves interactivity and demonstrates clickable search result handling
  */
  const handleSelect = (user) => {
    window.open(user.html_url, "_blank");
  };

  // ==================== CLEAR SEARCH ====================
  /*
    // Reference: Question 4 
    // Answer / Explanation:
    clearSearch resets input and search results.
    - Improves UX for repeated searches
    - Ensures controlled input state remains consistent
  */
  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div
      className="main-wrapper"
      style={{
        minHeight: "70vh", // Ensures full height
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "20px 15px",
        backgroundColor: "#f1f5f9",
      }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <h2 className="mb-2 text-center">GitHub User Search</h2>
        <p className="text-center mb-3">
          Search GitHub users. Debounced API calls with loading indicator.
        </p>

        {/* ==================== SEARCH INPUT ==================== */}
        <div className="input-group mb-3 search-bar">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search GitHub users..."
            value={query} // line 91
            onChange={(e) => setQuery(e.target.value)} // line 92
          />
          {query && (
            <button className="btn btn-outline-secondary" onClick={clearSearch}>
              ✕
            </button>
          )}
          {loading && (
            <span className="input-group-text bg-light">
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </span>
          )}
        </div>

        {/* ==================== RESULTS LIST ==================== */}
        {results.length > 0 && (
          <ul className="list-group shadow-sm results-list">
            {results.map((user) => (
              <li
                key={user.id}
                className="list-group-item list-group-item-action d-flex align-items-center"
                onClick={() => handleSelect(user)}
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="avatar me-3"
                />
                <span>{user.login}</span>
                <span className="badge bg-primary rounded-pill ms-auto">
                  GitHub
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer spacing placeholder */}
      <div style={{ flexGrow: 1 }}></div>
    </div>
  );
};

export default Question4;

/*
  ==================== QUESTION 4 SUMMARY ====================
  1. Debounced input implemented using custom useDebounce hook (lines 15-28, 42).
  2. API call triggered only after user stops typing for 500ms (lines 44-63).
  3. Loading spinner shows feedback during fetch (lines 93-100).
  4. Clear button resets search input and results (lines 71-75).
  5. Search results display avatar, username, badge, clickable to GitHub profile.
  6. Handles API errors gracefully.
  7. Controlled component input ensures reliable state (line 38).
  8. Design follows React component best practices for interview expectations.
*/
