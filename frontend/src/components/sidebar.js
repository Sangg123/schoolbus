import React from "react";
import "../stylecss/sidebar.css";

function Sidebar({
  isLoggedIn, loaiTK, 
  onTrackingClick, onNotifiClick, 
  onViewCalendar, onStudentList, onReport, onWarning, 
  onManageAcc, onListStudents, onListParents, onListDrivers, onListBuses, onListRoutes, onListStopPoint, onManageCalendar, onManageTrip, onMessage
}) {
  let menu;

  if(isLoggedIn && loaiTK === "admin"){
    menu=
    <div className="sidebar">
      <ul>
          <li onClick={onManageAcc}>Quản Lý Tài Khoản</li>

          <li className="has-submenu">
            Xem Danh Sách ▾
            <ul className="submenu">
              <li onClick={onListStudents}>Danh Sách Học Sinh</li>
              <li onClick={onListParents}>Danh Sách Phụ Huynh</li>
              <li onClick={onListDrivers}>Danh Sách Tài Xế</li>
              <li onClick={onListBuses}>Danh Sách Xe Buýt</li>
              <li onClick={onListRoutes}>Danh Sách Tuyến Đường</li>
              <li onClick={onListStopPoint}>Danh Sách Điểm Dừng</li>
            </ul>
          </li>
    
          <li onClick={onManageCalendar}>Tạo/ Cập Nhật Lịch</li>
          <li onClick={onManageTrip}>Quản Lý Chuyến Đi</li>
          <li onClick={onMessage}>Tin Nhắn</li>
        </ul>
    </div>;
  }
  else if (isLoggedIn && loaiTK === "driver"){
    menu=
    <div className="sidebar">
      <ul>
        <li onClick={onViewCalendar}>Xem Lịch</li>
        {/* <li onClick={onStudentList}>Danh Sách Học Sinh/Điểm Đón</li> */}
        <li onClick={onReport}>Điểm Danh/ Báo Cáo</li>
        <li onClick={onWarning}>Cảnh Báo</li>
      </ul>
    </div>;
  }
  else if (isLoggedIn && loaiTK === "parent"){
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
