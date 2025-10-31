import React from "react";
import "../stylecss/adminManageAcc.css";

function ADManageAcc() {
  return (
    <div className="acc-container">
      <h2 className="acc-title">👤 Quản lý tài khoản</h2>

      <table className="acc-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Người Dùng</th>
            <th>Email</th>
            <th>Mật Khẩu</th>
            <th>Họ Tên</th>
            <th>Số ĐT</th>
            <th>Vai Trò</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>admin</td>
            <td>123</td>
            <td>Admin</td>
            <td>0901</td>
            <td>admin</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>driver1</td>
            <td>123</td>
            <td>Nguyễn Văn Tài</td>
            <td>0902</td>
            <td>tài xế</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>3</td>
            <td>driver2</td>
            <td>123</td>
            <td>Trần Văn Lái</td>
            <td>0903</td>
            <td>tài xế</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>4</td>
            <td>parent1</td>
            <td>123</td>
            <td>Phạm Thị Lan</td>
            <td>0904</td>
            <td>phụ huynh</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>5</td>
            <td>parent2</td>
            <td>123</td>
            <td>Ngô Văn Bình</td>
            <td>0905</td>
            <td>phụ huynh</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="acc-actions">
        <button className="add-btn">➕ Thêm Tài Khoản</button>
        <button className="save-btn">💾 Lưu Thay Đổi</button>
      </div>
    </div>
  );
}

export default ADManageAcc;
