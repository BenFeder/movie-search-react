import React from "react";

function Footer({ onContactClick }) {
  return (
    <footer className="footer">
      <div className="footer__left">
        <img src="./assets/logo.png" alt="Logo" className="footer__logo" />
      </div>
      <div className="footer__center">
        <h1 className="footer__title">Movies Search</h1>
        <p className="footer__copyright">&copy; 2025 Benjamin Feder</p>
      </div>
      <div className="footer__right">
        <a href="#" className="footer__contact" onClick={onContactClick}>
          Contact Me
        </a>
      </div>
    </footer>
  );
}

export default Footer;
