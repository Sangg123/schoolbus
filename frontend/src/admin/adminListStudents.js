import React from "react";
import "../stylecss/adminListStudents.css";

function ADListStudents() {
  return (
    <div className="stu-container">
      <h2 className="stu-title">🎓 Danh Sách Học Sinh</h2>

      <table className="stu-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Số HS</th>
            <th>Họ Tên</th>
            <th>Lớp</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>HS001</td>
            <td>Nguyễn Minh Khang</td>
            <td>3A</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>HS002</td>
            <td>Trần Bảo Ngọc</td>
            <td>4B</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>HS003</td>
            <td>Phạm Quốc Huy</td>
            <td>2C</td>
            <td>
              <button className="edit-btn">Sửa</button>
              <button className="delete-btn">Xoá</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="stu-actions">
        <button className="add-btn">➕ Thêm Học Sinh</button>
        <button className="save-btn">💾 Lưu Thay Đổi</button>
      </div>
    </div>
  );
}

export default ADListStudents;
