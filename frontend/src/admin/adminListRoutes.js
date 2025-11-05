import React from "react";
import "../stylecss/adminListRoutes.css";

function ADListRoute() {
  return (
    <div className="drv-container">
      <h2 className="drv-title">🛣️ Danh Sách Tuyến Đường</h2>

      <table className="drv-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Tuyến</th>
            <th>Tên Tuyến</th>
            <th>Mô Tả</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>R001</td>
            <td>Tuyến A - Quận 1 đến Trường DEF</td>
            <td>Tuyến chính buổi sáng</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>R002</td>
            <td>Tuyến B - Quận 7 đến Trường DEF</td>
            <td>Tuyến buổi chiều</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="drv-actions">
        <button className="add-btn">➕ Thêm Tuyến</button>
        <button className="save-btn">💾 Lưu Thay Đổi</button>
      </div>
    </div>
  );
}

export default ADListRoute;
