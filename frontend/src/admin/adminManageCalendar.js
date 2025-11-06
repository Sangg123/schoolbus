import React, { useState } from "react";
import "../stylecss/adminManageCalendar.css";

function ADManageCalendar({onCreateCalendar}) {
  return (
    <div className="calendar-container">
      <h2 className="calendar-title">📅 Lịch Hôm Nay</h2>

      <button className="create-calendar-btn" onClick={onCreateCalendar}>
        ➕ Tạo Lịch Mới
      </button>

      <table className="calendar-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Lịch</th>
            <th>Thứ</th>
            <th>Thời Gian Bắt Đầu</th>
            <th>Xe</th>
            <th>Tài Xế</th>
            <th>Loại</th>
            <th>Tuyến</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>L01</td>
            <td>Hai</td>
            <td>06:30</td>
            <td>51B-12345</td>
            <td>Nguyễn Văn Tài</td>
            <td>Đón</td>
            <td>A</td>
            <td>
              <button className="update-btn">Cập Nhật</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>L02</td>
            <td>Hai</td>
            <td>16:00</td>
            <td>51B-67890</td>
            <td>Trần Văn Lái</td>
            <td>Trả</td>
            <td>B</td>
            <td>
              <button className="update-btn">Cập Nhật</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Chi tiết lộ trình */}
      <div className="calendar-section">
        <h3 className="calendar-subtitle">📍 Chi Tiết Lộ Trình (Mã lịch: L01)</h3>
        <table className="calendar-table">
          <thead>
            <tr>
              <th>Tuyến</th>
              <th>Địa Chỉ Dừng</th>
              <th>Thứ Tự Dừng</th>
              <th>Giờ Dự Kiến</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>123 Nguyễn Trãi</td>
              <td>1</td>
              <td>06:30</td>
            </tr>
            <tr>
              <td>A</td>
              <td>45 Lê Lợi</td>
              <td>2</td>
              <td>06:45</td>
            </tr>
            <tr>
              <td>A</td>
              <td>456 Nguyễn Văn Cừ</td>
              <td>3</td>
              <td>07:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ADManageCalendar;
