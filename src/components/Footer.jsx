import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer bg-primary text-light pt-5 pb-3 mt-auto">
      <div className="container pt-0 pb-0">
        <div className="row gy-4">
          {/* ===== Brand Section ===== */}
          <div className="col-lg-4 col-md-6">
            <a
              href="#"
              className="d-flex align-items-center mb-3 text-light text-decoration-none"
            >
              <img
                src="https://www.sigmaguys.com/uploads/logo/logo.svg"
                alt="Logo"
                width="80"
                height="40"
                className="me-2"
              />
              <h5 className="mb-0 fw-bold">YourBrand</h5>
            </a>
            <p className="text-light opacity-75">
              Building high-quality, responsive web solutions with passion and
              precision.
            </p>
          </div>

          {/* ===== Quick Links ===== */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* ===== Contact Info ===== */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase">Contact</h6>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-geo-alt-fill me-2"></i>Mumbai, India
              </li>
              <li>
                <i className="bi bi-telephone-fill me-2"></i>+91 98765 43210
              </li>
              <li>
                <i className="bi bi-envelope-fill me-2"></i>info@yourbrand.com
              </li>
            </ul>
          </div>

          {/* ===== Social Links ===== */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="social-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-light opacity-25 my-4" />

        {/* ===== Copyright ===== */}
        <div className="text-center small opacity-75">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
