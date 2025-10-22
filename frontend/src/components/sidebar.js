import React from "react";
import "../stylecss/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li className="sidebar-item">🚐 Quản lý tuyến đường</li>
        <li className="sidebar-item">👨‍🏫 Quản lý tài xế</li>
        <li className="sidebar-item">👩‍🎓 Quản lý học sinh</li>
      </ul>
    </div>
  );
}

export default Sidebar;
