import React from "react";
import "../stylecss/navbar.css";

function Navbar({ isLoggedIn, onLoginClick, loaiTK, onLogoutClick }) {
  let content;
  if (isLoggedIn && loaiTK =="admin"){
    content = 
    <div>
      <div className="welcome-text">Xin chào Admin 👋</div>
      <button className="login-btn" onClick={onLogoutClick}>Đăng xuất</button>
    </div>;
  }
  else if (isLoggedIn && loaiTK =="phuhuynh"){
    content = 
    <div>
      <div className="welcome-text">Xin chào Phụ huynh 👋</div>
      <button className="login-btn" onClick={onLogoutClick}>Đăng xuất</button>
    </div>;
  }
  else if (isLoggedIn && loaiTK =="taixe"){
    content = 
    <div>
      <div className="welcome-text">Xin chào Tài xế 👋</div>
      <button className="login-btn" onClick={onLogoutClick}>Đăng xuất</button>
    </div>;
  }
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
