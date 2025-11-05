import React from "react";
import "../stylecss/adminListBuses.css";

function ADListBus() {
  return (
    <div className="bus-container">
      <h2 className="bus-title">🚌 Danh Sách Xe Buýt</h2>

      <table className="bus-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Xe</th>
            <th>Biển Số</th>
            <th>Sức Chứa</th>
            <th>Vĩ Độ Hiện Tại</th>
            <th>Kinh Độ Hiện Tại</th>
            <th>Thời Gian Cập Nhật Cuối</th>
            <th>Tùy Chỉnh</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>BX001</td>
            <td>51B-12345</td>
            <td>25</td>
            <td>10.76262200</td>
            <td>106.66017200</td>
            <td>2025-10-28 20:40:10</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>BX002</td>
            <td>51B-67890</td>
            <td>30</td>
            <td>10.77000000</td>
            <td>106.70000000</td>
            <td>2025-10-28 20:40:10</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bus-actions">
        <button className="add-btn">➕ Thêm Xe Buýt</button>
        <button className="save-btn">💾 Lưu Thay Đổi</button>
      </div>
    </div>
  );
}

export default ADListBus;
