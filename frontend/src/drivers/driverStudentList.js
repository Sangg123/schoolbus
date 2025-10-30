import React from "react";
import "../stylecss/driverStudentList.css";

function DRStudentList() {
  return (
    <div className="studentlist-container">
      <h3 className="studentlist-title">🧒 Danh sách học sinh phải đón / trả hôm nay</h3>
      <table className="studentlist-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Lịch</th>
            <th>Tên</th>
            <th>Mã Số HS</th>
            <th>Địa Chỉ Đón</th>
            <th>Địa Chỉ Trả</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>Nguyễn Minh Khang</td>
            <td>HS001</td>
            <td>123 Nguyễn Trãi</td>
            <td>456 Nguyễn Văn Cừ</td>
          </tr>
          <tr>
            <td>2</td>
            <td>1</td>
            <td>Trần Bảo Ngọc</td>
            <td>HS002</td>
            <td>45 Lê Lợi</td>
            <td>456 Nguyễn Văn Cừ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DRStudentList;
