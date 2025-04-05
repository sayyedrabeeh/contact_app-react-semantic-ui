import React from "react";

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-container">
        <i className="address book icon header-icon"></i>
        <h1>Contact Manager</h1>
      </div>
      <div className="header-actions">
        <button className="theme-toggle">
          <i className="moon icon"></i>
        </button>
      </div>
    </div>
  );
};

export default Header;