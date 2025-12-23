import React from "react";

function Navbar({
  searchQuery,
  onSearch,
  onInputChange,
  onKeyPress,
  onContactClick,
  user,
  onAuthClick,
}) {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img src="./assets/logo.png" alt="Logo" className="navbar__logo" />
      </div>
      <div className="navbar__center">
        <h1 className="navbar__title">Movies Search</h1>
        <div className="navbar__search-container">
          <input
            type="text"
            className="navbar__search"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
          />
          <span className="navbar__search-icon" onClick={onSearch}>
            🔍
          </span>
        </div>
      </div>
      <div className="navbar__right">
        {user ? (
          <div className="navbar__auth">
            <span className="navbar__user">{user.email}</span>
            <button
              className="navbar__button navbar__button--logout"
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  require("../firebase").auth.signOut();
                }
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="navbar__button" onClick={onAuthClick}>
            Login / Register
          </button>
        )}
        <a href="#" className="navbar__contact" onClick={onContactClick}>
          Contact Me
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
