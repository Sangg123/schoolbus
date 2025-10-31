import React from "react";
import "../stylecss/sidebar.css";

function Sidebar({
  isLoggedIn, loaiTK, 
  onTrackingClick, onNotifiClick, 
  onViewCalendar, onStudentList, onReport, onWarning, 
  onManageAcc, onListStudents, onListDrivers, onListBuses, onListRoutes, onManageCalendar, onMessage
}) {
  let menu;

  if(isLoggedIn && loaiTK=="admin"){
    menu=
    <div className="sidebar">
      <ul>
          <li onClick={onManageAcc}>Quản Lý Tài Khoản</li>

          <li className="has-submenu">
            Xem Danh Sách ▾
            <ul className="submenu">
              <li onClick={onListStudents}>Danh Sách Học Sinh</li>
              <li onClick={onListDrivers}>Danh Sách Tài Xế</li>
              <li onClick={onListBuses}>Danh Sách Xe Buýt</li>
              <li onClick={onListRoutes}>Danh Sách Tuyến Đường</li>
            </ul>
          </li>

          <li onClick={onManageCalendar}>Tạo/ Cập Nhật Lịch</li>
          <li onClick={onMessage}>Tin Nhắn</li>
        </ul>
    </div>;
  }
  else if (isLoggedIn && loaiTK=="taixe"){
    menu=
    <div className="sidebar">
      <ul>
        <li onClick={onViewCalendar}>Xem Lịch</li>
        <li onClick={onStudentList}>Danh Sách Học Sinh</li>
        <li onClick={onReport}>Báo Cáo</li>
        <li onClick={onWarning}>Cảnh Báo</li>
      </ul>
    </div>;
  }
  else if (isLoggedIn && loaiTK=="phuhuynh"){
    menu=
    <div className="sidebar">
      <ul>
        <li onClick={onTrackingClick}>Theo Dõi Xe</li>
        <li onClick={onNotifiClick}>Thông Báo</li>
      </ul>
    </div>;
  }

  if (isLoggedIn){
    return menu;
  }
}

export default Sidebar;
