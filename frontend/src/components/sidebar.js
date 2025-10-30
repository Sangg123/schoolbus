import React from "react";
import "../stylecss/sidebar.css";

function Sidebar({isLoggedIn, loaiTK, onTrackingClick}) {
  let menu;

  if(isLoggedIn && loaiTK=="admin"){
    menu=
    <div className="sidebar">
      <ul>
        <li>Quản Lý Tài Khoản</li>
        <li>Xem Danh Sách</li>
        <li>Tạo/ Cập Nhật Lịch</li>
        <li>Tin Nhắn</li>
      </ul>
    </div>;
  }
  else if (isLoggedIn && loaiTK=="taixe"){
    menu=
    <div className="sidebar">
      <ul>
        <li>Xem Lịch</li>
        <li>Danh Sách Học Sinh</li>
        <li>Báo Cáo</li>
        <li>Cảnh Báo</li>
      </ul>
    </div>;
  }
  else if (isLoggedIn && loaiTK=="phuhuynh"){
    menu=
    <div className="sidebar">
      <ul>
        <li onClick={onTrackingClick}>Theo Dõi Xe</li>
        <li>Thông Báo</li>
      </ul>
    </div>;
  }

  if (isLoggedIn){
    return menu;
  }
}

export default Sidebar;
