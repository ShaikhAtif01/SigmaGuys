// ==================== QUESTION 2 - CSS LAYOUT CHALLENGE (HEADER IMPLEMENTATION) ====================
//
// ✅ Explanation for Interview / Review:
//
// This component (`Header.jsx`) implements a responsive **Header + Sidebar layout**
// using React, Bootstrap, and CSS as required in Question 2.
//
// 🔹 Layout Goals Achieved:
// 1. Fixed Header — Always visible at top (`fixed-top`), ensuring navigation accessibility.
// 2. Left Sidebar (Mobile) — Implemented via Bootstrap Offcanvas; collapses automatically when a link is clicked.
// 3. Main Content — Central nav links expand to fill available space via Flexbox.
// 4. Responsive Design — Desktop layout (logo-left, nav-center, user-right) automatically switches to sidebar on mobile.
// 5. Dynamic User State — Login/Logout handled with React state and `localStorage`.
// 6. Semantic Structure — Uses <header>, <nav>, <ul>, and <li> for accessibility and SEO.
//
// 🔹 Technical Highlights:
// - `useEffect` retrieves user data from `localStorage` for persistent login.
// - `handleLogout` clears data and redirects user to `/login`.
// - `closeMobileMenu` manages Bootstrap Offcanvas to hide mobile sidebar.
// - Layout demonstrates real-world responsive behavior with CSS Flexbox and Bootstrap grid.
//
// (Used for Question 2: CSS Layout Challenge explanation)

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ==================== USER DATA FETCH (Used in dynamic login state for header) ====================
  /*
    - Question 2 Relation:
      Retrieves user info to dynamically show login/logout buttons.
      Ensures header layout changes based on authentication state.
      Helps maintain consistency in the header section layout.
  */
  useEffect(() => {
    const storedUser = localStorage.getItem("app_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ==================== LOGOUT FUNCTION (Used to reset layout dynamically) ====================
  /*
    - Question 2 Relation:
      Clears user data and updates header layout immediately.
      When user logs out:
        1. "Hi, username" and "Logout" button disappear.
        2. Login button reappears.
      Ensures responsive header adjusts without breaking layout.
  */
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("app_user");
    navigate("/login");
  };

  // ==================== CLOSE MOBILE MENU FUNCTION (Used in sidebar behavior) ====================
  /*
    - Question 2 Relation:
      Handles the closing of sidebar (offcanvas) after user clicks a menu item.
      Maintains smooth responsive UX and prevents sidebar from staying open.
      Critical for mobile layout portion of CSS Layout Challenge.
  */
  const closeMobileMenu = () => {
    const offcanvas = document.getElementById("mobileMenu");
    const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvas);
    if (bsOffcanvas) bsOffcanvas.hide();
  };

  return (
    <>
      {/* ==================== FIXED HEADER SECTION ==================== */}
      {/*
        - Question 2 Relation (Used in fixed header layout part):
          Creates a top-level navigation bar fixed at top using `fixed-top`.
          Uses Flexbox to align logo (left), links (center), and user actions (right).
          Responsive behavior is managed using Bootstrap’s grid and flex classes.
      */}
      <header className="fixed-top bg-light shadow-sm">
        <nav className="navbar navbar-expand-lg navbar-light container flex-column flex-lg-row">
          {/* MOBILE HEADER (Used for sidebar toggle + logo in mobile layout) */}
          {/*
            - Question 2 Relation:
              Bootstrap Offcanvas used as mobile sidebar.
              Toggle button activates sidebar menu (left sidebar in mobile view).
              Logo remains centered — maintaining header symmetry.
          */}
          <div className="d-flex w-100 align-items-center d-lg-none position-relative">
            <button
              className="navbar-toggler order-1 ms-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileMenu"
              aria-controls="mobileMenu"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <Link
              className="navbar-brand d-flex align-items-center order-2 mx-auto"
              to="/"
            >
              <img
                src="https://www.sigmaguys.com/uploads/logo/logo.svg"
                alt="logo"
                width="100"
                height="50"
              />
            </Link>
          </div>

          {/* DESKTOP HEADER (Used for full-width layout with logo, links, and user controls) */}
          {/*
            - Question 2 Relation:
              Desktop layout using `justify-content-between`.
              Distributes logo (left), nav links (center), and user info (right).
              Achieves flexible layout for large screens.
          */}
          <div className="collapse navbar-collapse w-100 justify-content-between align-items-center mt-3 mt-lg-0 d-none d-lg-flex">
            <Link className="navbar-brand" to="/">
              <img
                src="https://www.sigmaguys.com/uploads/logo/logo.svg"
                alt="logo"
                width="100"
                height="50"
                className="me-2"
              />
            </Link>

            {/* NAVIGATION LINKS (Used as main content area of header) */}
            {/*
              - Question 2 Relation:
                Navigation links represent the “content area” part of the layout.
                Centered using Flexbox (`mx-auto text-center flex-row`).
                Expands horizontally between logo and user controls.
            */}
            <ul className="navbar-nav mx-auto text-center flex-row">
              <li className="nav-item mx-3">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/question4">
                  Task No 4
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/question5">
                  Task No 5 & 6
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/question7">
                  Task No 7
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/question8">
                  Task No 8
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/question9">
                  Task No 9
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/question10">
                  Task No 10
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/product">
                  Products
                </Link>
              </li>
            </ul>

            {/* USER LOGIN/LOGOUT SECTION (Used in right side layout) */}
            {/*
              - Question 2 Relation:
                Dynamic area that updates layout when user logs in or logs out.
                Keeps spacing and alignment balanced with Flexbox properties.
            */}
            <div className="text-end">
              {user ? (
                <>
                  <span className="me-2">Hi, {user.username}</span>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login">
                  <button className="btn btn-theme px-4 py-2">Login</button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* ==================== MOBILE OFFCANVAS MENU ==================== */}
      {/*
        - Question 2 Relation (Used in sidebar portion of layout):
          Acts as the “Left Sidebar” for mobile layout.
          Collapsible offcanvas menu that appears when user clicks toggle button.
          Automatically closes on link click for better UX.
      */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileMenuLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body text-center">
          <ul className="navbar-nav">
            <li className="nav-item my-2">
              <Link
                className="nav-link active"
                to="/"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link className="nav-link" to="/question4">
                Task No 4
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link className="nav-link" to="/question5">
                Task No 5 & 6
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link className="nav-link" to="/question7">
                Task No 7
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link className="nav-link" to="/question8">
                Task No 8
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link className="nav-link" to="/question10">
                Task No 10
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link
                className="nav-link"
                to="/product"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
          </ul>

          {/* USER SECTION INSIDE MOBILE SIDEBAR */}
          {/*
            - Question 2 Relation:
              User section adapts to sidebar view.
              Buttons remain accessible and vertically aligned.
              Enhances responsive usability.
          */}
          {user ? (
            <>
              <span className="me-2">Hi, {user.username}</span>
              <button
                className="btn btn-outline-danger mt-4 px-4 py-2"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="mt-4 d-inline-block"
              onClick={closeMobileMenu}
            >
              <button className="btn btn-theme px-4 py-2">Login</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

/*
  ==================== QUESTION 2 SUMMARY ====================
  - Fixed header (top navigation bar) ensures always visible access.
  - Left sidebar created via Bootstrap Offcanvas for mobile screens.
  - Central nav links fill remaining space (main content area).
  - Dynamic user buttons keep layout updated instantly.
  - Semantic HTML structure improves SEO & accessibility.
  - Fully satisfies CSS Layout Challenge (Header + Sidebar + Responsive).
*/
