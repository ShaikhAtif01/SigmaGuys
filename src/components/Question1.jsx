// ==================== IMPORTS ====================
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Question1.css";
import Question3 from "./Question3";

const Question1 = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* ==================== QUESTION 1 ==================== */}
      {/*
        Question 1: Semantic HTML & Accessibility
        --------------------------------------------------------------------
        Question 1:
        1️ What are semantic HTML elements and why are they important for accessibility and SEO?
        1.1 Give three examples of semantic elements and explain their role.
        1.2 Show how you would make a button accessible for screen readers. =  (Example Start Line Number = 90)

         Answer:
        Semantic HTML elements clearly describe their purpose to both browsers and developers.
        They help:
          - Improve accessibility for screen readers.
          - Improve SEO because search engines understand content meaning.
          - Create well-structured, maintainable code.

        Examples:
        - <header> → Defines the page header (logo/navigation).
        - <main> → Main content area of the page.
        - <footer> → Footer information or links.
        - <article> → Self-contained section (e.g., blog post, card).
        - <section> → Groups related content thematically.

        Accessibility Example:
        - Buttons and modals include proper aria labels.
        - <img> tags include descriptive "alt" attributes.
      */}

      {/* ==================== HEADER ==================== */}
      {/*
        The <header> component (imported in App.js) represents the page header.
        📍 Used for logo/navigation and recognized by screen readers automatically.
        📈 SEO engines treat it as the top content block of the page.
      */}

      {/* ==================== MAIN CONTENT ==================== */}
      {/*
        The <main> element here contains all primary page content.
        Inside it:
          - <section> groups related visual content.
          - <article> self-contained content blocks.
          - <img> includes alt text for accessibility.
      */}
      <main className="container my-1 pt-0 pb-0">
        <section className="row justify-content-center align-items-center g-4 my-1">
          {/* ==================== FIRST ARTICLE ==================== */}
          {/* 
            <article>: Self-contained block with accessible image.
            <img> uses alt="Performance" so screen readers know what the image shows.
          */}
          <article className="col-12 col-md-6 text-center">
            <div className="image-card rounded-4 overflow-hidden position-relative">
              <img
                src="https://www.sigmaguys.com/static/image/uploads/default/performance/4.png?w=1800&h=1000&v=1.1.9"
                alt="Performance"
                className="img-fluid w-100 image-styled"
              />
              <div className="image-overlay-text"></div>
            </div>
          </article>

          <article className="col-12 col-md-6 text-center">
            <div className="image-card rounded-4 overflow-hidden position-relative">
              <img
                src="https://www.sigmaguys.com/static/image/uploads/consolidate-sigma/hair-loss-combo/stage2/S2-%2018-25-%20Reinforce%20Phase/1.jpg?w=1000&h=1000&v=1.1.9"
                alt="Hair Care"
                className="img-fluid w-100 image-styled"
              />
              <div className="image-overlay-text">
                Our specialized hair-care solutions are tailored for visible
                results.
              </div>
            </div>
          </article>
        </section>
      </main>

      {/* (Q1) 1.2 Show how you would make a button accessible for screen readers. */}

      {/* ==================== ACCESSIBLE MODAL BUTTON ==================== */}
      {/*
        
        Accessible Button Example:
        - The button has clear text: "Open Promo Modal".
        - It triggers a modal that uses aria attributes for screen readers.

        Accessibility Attributes:
        - role="dialog": Announces modal to assistive technologies.
        - aria-modal="true": Prevents background interaction.
        - aria-labelledby links title with dialog.
      */}
      <div className="text-center my-5">
        <button
          className="btn"
          style={{
            background: "linear-gradient(to right, #134547 0%, #134547 100%)",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setShowModal(true)}
        >
          Open Promo Modal
        </button>
      </div>

      {/* ==================== MODAL ==================== */}
      {/*
        Modal Section (~line 92 onward)
        - Uses semantic roles and aria attributes.
        - "btn-close" has aria-label="Close modal" → makes close button accessible.
      */}
      {showModal && (
        <div
          className="modal d-block"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                background: "#e8f0f0",
                color: "#134547",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                className="modal-header"
                style={{
                  background:
                    "linear-gradient(to right, #134547 0%, #134547 100%)",
                  color: "#fff",
                }}
              >
                <h5 id="modalTitle" className="modal-title">
                  Special Offer
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close modal"
                  onClick={() => setShowModal(false)}
                  style={{ filter: "invert(1)" }}
                ></button>
              </div>
              <div className="modal-body" style={{ fontSize: "16px" }}>
                <p>Get 20% off on all hair-care products today!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== FOOTER ==================== */}
      {/*
        Footer (imported in App.js):
        - <footer> semantic tag denotes the page bottom.
        - Screen readers recognize it as the closing section of the page.
        - SEO: Usually includes contact links or copyright.
      */}
      <Question3 />
    </div>
  );
};

export default Question1;
