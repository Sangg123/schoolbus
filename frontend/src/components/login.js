import React, { useState } from "react";
import "../stylecss/login.css";

function LoginPopup({ onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Đăng nhập</h2>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="popup-buttons">
          <button onClick={() => onLogin(username, password)}>Đăng nhập</button>
          <button onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
