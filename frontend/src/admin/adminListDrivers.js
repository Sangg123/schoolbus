import React from "react";
import "../stylecss/adminListDrivers.css";

function ADListDrivers() {
  return (
    <div className="drv-container">
      <h2 className="drv-title">🚗 Danh Sách Tài Xế</h2>

      <table className="drv-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Tài Xế</th>
            <th>Họ Tên</th>
            <th>Số Bằng Lái</th>
            <th>Số ĐT</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>TX001</td>
            <td>Nguyễn Văn Tài</td>
            <td>BL123456</td>
            <td>0902</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>TX002</td>
            <td>Trần Văn Lái</td>
            <td>BL654321</td>
            <td>0903</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="drv-actions">
        <button className="add-btn">➕ Thêm Tài Xế</button>
        <button className="save-btn">💾 Lưu Thay Đổi</button>
      </div>
    </div>
  );
}

export default ADListDrivers;
