import React, { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import LoginPopup from "./components/login";
import Home from "./pages/home";
import ManageBus from "./pages/managebus";
import MapComponent from "./components/mapcomponent";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaiTK, setLoaiTK] = useState("");
  const [showTracking, setShowTracking] = useState(false);
  
  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin") {
      setLoaiTK("admin");
      setIsLoggedIn(true);
      setShowLogin(false);
      alert("Đăng nhập thành công!");
    }
    else if (username === "phuhuynh" && password === "phuhuynh") {
      setLoaiTK("phuhuynh");
      setIsLoggedIn(true);
      setShowLogin(false);
      alert("Đăng nhập thành công!");
    }
    else if (username === "taixe" && password === "taixe") {
      setLoaiTK("taixe");
      setIsLoggedIn(true);
      setShowLogin(false);
      alert("Đăng nhập thành công!");
    }
    else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  const handleLogout = ()=>{
    setIsLoggedIn(false);
    setShowTracking(false);
  }

  const showTrackingBus=()=>{
    setShowTracking(true);
  }

  return (
    <div className="app-container">
      {/* Thanh navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLogin(true)}
        loaiTK={loaiTK}
        onLogoutClick={handleLogout}
      />

      <div className="main-layout">
        {/* Sidebar hiển thị sau khi đăng nhập */}
        <Sidebar
          isLoggedIn={isLoggedIn} 
          loaiTK={loaiTK} 
          onTrackingClick={showTrackingBus} 
        />

        {/* Nội dung chính */}
        <div className="content"> 
          {!isLoggedIn && <Home />}
           
          {/* { Popup Tracking} */} 
          { showTracking && (<ManageBus/>) } 
        </div>
      </div>

      {/* Popup đăng nhập */}
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
