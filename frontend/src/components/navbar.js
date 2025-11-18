import React from "react";
import "../stylecss/navbar.css";

function Navbar({ isLoggedIn, onLoginClick, loaiTK, onLogoutClick, userInfo}) {  
  var fullName = "";
  if (userInfo) {
    fullName = userInfo.user?.fullName;
  }
  
  var wellcomeString = `Xin chào ${loaiTK} ${fullName}`;

  let content = 
    <div>
      <div className="welcome-text">{wellcomeString}</div>
      <button className="login-btn" onClick={onLogoutClick}>Đăng xuất</button>
    </div>;
  return (
    <nav className="navbar">
      <div className="logo">🚍 Smart School Bus</div>
      {isLoggedIn ?   ( content ) : (
        <button className="login-btn" onClick={onLoginClick}>
          Đăng nhập
        </button>
      )}
    </nav>
  );
}

export default Navbar;
