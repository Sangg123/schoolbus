import React, { useEffect, useState } from "react";
import "../stylecss/adminManageAcc.css";
import getalluser from "../api/getalluser";
import "../stylecss/general.css";
import addUserapi from "../api/addUser"



//todo: reload after add account
//
export default function ADManageAcc() {
  const [users, setUsers] = useState([]);
  const [showadduser, setShowAddUser] = useState(false);
  const [createUser, setCreateUser] = useState({
    email: "", password: "", fullNawme: "", phone: "", role: ""
  });

  const getalluserFunction = async () => {
    try {
      const response = await getalluser("", "", "", "");
      setUsers(response?.data ?? []);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    getalluserFunction();
  }, [])

  const renderUserRow = (user, index) => {
    const { id, email, fullName, phone, role } = user ?? {};
    const key = id ?? index;
    const number = index + 1;
    return (
      <tr key={key}>
        <td>{number}</td>
        <td>{id}</td>
        <td>{email}</td>
        <td>{fullName}</td>
        <td>{phone ?? "-"}</td>
        <td>{role}</td>
        <td>
          <button className="edit-btn">Sửa</button>
          <button className="delete-btn">Xoá</button>
        </td>
      </tr>
    );
  };

  const userTable = (
    <tbody>
      {users.map(renderUserRow)}
    </tbody>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateUser(prev => ({ ...prev, [name]: value }));
  };

  const requestAddUser = async (createUser) => {
    try {
      const response = await addUserapi(createUser.email, createUser.password, createUser.fullName, createUser.phone, createUser.role);
    } catch (err) {
      if (err.response.data.message === "Email already exists") {
        alert("Email đã tồn tại");
      } else if (err.response.data.meta?.target[0] === "phone") {
        alert("Số điện thoại đã được sử dụng");
      }
      console.error(err);
    }

  };


  //todo: add validation
  const addUser = (
    <div className="popup-overlay">
      <div className="adduser popup">
        <input type="email" name="email" placeholder="Email" value={createUser.email} onChange={handleChange}></input>
        <input type="password" name="password" placeholder="Mật khẩu" value={createUser.password} onChange={handleChange}></input>
        <input type="text" name="fullName" placeholder="Tên người dùng" value={createUser.fullName} onChange={handleChange}></input>
        <input type="tel" name="phone" placeholder="Số điện thoại" value={createUser.phone} onChange={handleChange}></input>
        <input type="text" name="role" placeholder="Vai trò" value={createUser.role} onChange={handleChange}></input>
        <div className="popup-actions">
          <input className="btn" type="button" name="confirm" value="Xác nhận" onClick={() => { requestAddUser(createUser); getalluserFunction() }}></input>
          <input className="btn" type="button" name="closeAddUser" value="Hủy bỏ" onClick={() => { setShowAddUser(false); setCreateUser("") }}></input>
        </div>
      </div>
    </div>
  );

  return (
    <div className="acc-container">
      <h2 className="acc-title">👤 Quản lý tài khoản</h2>
      <table className="acc-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Email</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        {userTable}
      </table>
      <div className="acc-actions">
        <button className="add-btn" onClick={() => { setShowAddUser(true) }}>➕ Thêm Tài Khoản</button>
        {showadduser && addUser}
      </div>

    </div>
  );
}