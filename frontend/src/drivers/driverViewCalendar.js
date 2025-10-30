import React from "react";
import "../stylecss/driverViewCalendar.css";

function DRViewCalendar() {
  return (
    <div className="calendar-container">
      {/* Lịch trình hôm nay */}
      <div className="calendar-section">
        <h3 className="calendar-title">🗓️ Lịch trình hôm nay</h3>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>2</td>
              <td>06:30</td>
              <td>1</td>
              <td>Nguyễn Văn Tài</td>
              <td>Đón</td>
              <td>A</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Chi tiết lộ trình */}
      <div className="calendar-section">
        <h3 className="calendar-title">📍 Chi tiết lộ trình (Mã lịch: 1)</h3>
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

export default DRViewCalendar;
