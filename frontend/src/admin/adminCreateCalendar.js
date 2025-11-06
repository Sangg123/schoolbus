import React from "react";
import "../stylecss/adminCreateCalendar.css";

function ADCreateCalendar({onBackManageCalendar}) {
  return (
    <div className="create-calendar-container">
      <h2 className="title">📅 Tạo Lịch Mới</h2>

      <button onClick={onBackManageCalendar} className="back-btn">
        ← Quay Lại
      </button>

      <div className="form-section">
        <div className="form-row">
          <label>Chọn Thứ:</label>
          <select>
            <option>Thứ 2</option>
            <option>Thứ 3</option>
            <option>Thứ 4</option>
            <option>Thứ 5</option>
            <option>Thứ 6</option>
            <option>Thứ 7</option>
          </select>
        </div>

        <div className="form-row">
          <label>Chọn Thời Gian Bắt Đầu:</label>
          <select>
            <option>06:30</option>
            <option>11:00</option>
            <option>12:30</option>
            <option>17:00</option>
          </select>
        </div>

        <div className="form-row">
          <label>Chọn Xe:</label>
          <select>
            <option>1</option>
            <option>2</option>
          </select>
        </div>

        <div className="form-row">
          <label>Chọn Tài Xế:</label>
          <select>
            <option>Nguyễn Văn Tài</option>
            <option>Trần Văn Lái</option>
          </select>
        </div>

        <div className="form-row">
          <label>Chọn Tuyến:</label>
          <select>
            <option>Tuyến A - Quận 1 đến Trường DEF</option>
            <option>Tuyến B - Quận 7 đến Trường DEF</option>
          </select>
        </div>

        <div className="form-row">
          <label>Chọn Loại:</label>
          <select>
            <option>Đón</option>
            <option>Trả</option>
          </select>
        </div>

        <div className="form-row">
          <button type="button" className="assign-btn">
            👥 Phân Công Học Sinh
          </button>
        </div>
      </div>

      {/* Lộ trình */}
      <div className="route-section">
        <h3 className="section-title">🛣️ Thứ Tự Lộ Trình</h3>
        <table className="route-table">
          <thead>
            <tr>
              <th>Thứ Tự</th>
              <th>Địa Chỉ Dừng</th>
              <th>Giờ Dự Kiến</th>
              <th>Tùy Chỉnh</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" placeholder="Nhập thứ tự dừng" /></td>
              <td>123 Nguyễn Trãi</td>
              <td><input type="time" /></td>
              <td><button className="delete-btn">Xoá</button></td>
            </tr>
            <tr>
              <td><input type="text" placeholder="Nhập thứ tự dừng" /></td>
              <td>45 Lê Lợi</td>
              <td><input type="time" /></td>
              <td><button className="delete-btn">Xoá</button></td>
            </tr>
            <tr>
              <td><input type="text" placeholder="Nhập thứ tự dừng" /></td>
              <td>456 Nguyễn Văn Cừ</td>
              <td><input type="time" /></td>
              <td><button className="delete-btn">Xoá</button></td>
            </tr>
          </tbody>
        </table>

        <button type="button" className="add-btn">➕ Thêm điểm dừng</button>
      </div>

      <div className="button-row">
        <button type="submit" className="save-btn">
          💾 Tạo Lịch
        </button>
      </div>
    </div>
  );
}

export default ADCreateCalendar;
