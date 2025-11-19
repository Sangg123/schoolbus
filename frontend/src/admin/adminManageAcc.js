import React, { useEffect } from "react";
import "../stylecss/adminManageAcc.css";
import getalluser from "../api/getalluser";
function ADManageAcc() {
  //todo: add filter (mayber)
  var fullTable = null;
  useEffect(() => {
    const data = requestalluser("", "", "", "");
    for (var i = 0; i < data.length; i++) {
      var user = data[i];
      fullTable = fullTable + accountTable(i, user.id, user.email, user.fullName, user.phone, user.role);
    }
  }, []);


  console.log(fullTable)
  const accountTable = (index, id, email, fullName, phone, role) => {
    return (
      <tr>
        <td>{index}</td>
        <td>{id}</td>
        <td>{email}</td>
        <td>{fullName}</td>
        <td>{phone}</td>
        <td>{role}</td>
        <td>
          <button className="edit-btn">Sửa</button>
          <button className="delete-btn">Xoá</button>
        </td>
      </tr>
    );
  }

  return (
    <div className="acc-container">
      <h2 className="acc-title">👤 Quản lý tài khoản</h2>

      <table className="acc-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Người Dùng</th>
            <th>Email</th>
            <th>Họ Tên</th>
            <th>Số ĐT</th>
            <th>Vai Trò</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>
        <tbody>
          {fullTable}
        </tbody>
      </table>

      <div className="acc-actions">
        <button className="add-btn">➕ Thêm Tài Khoản</button>
        <button className="save-btn">💾 Lưu Thay Đổi</button>
      </div>
    </div>
  );
}

var requestalluser = async (email, fullName, phone, role) => {
  try {
    const response = await getalluser(email, fullName, phone, role);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
}
export default ADManageAcc;
