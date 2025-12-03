import React, { useState, useEffect } from "react";
import "../stylecss/adminListParent.css";

import getalluser from "../api/getalluser";
import getAllParent from "../api/getAllParent";
import updateParent from "../api/updateParent";
import createParent from "../api/createParent";
import deleteParent from "../api/deleteParent";

function ADListParent() {
  const [parents, setParents] = useState([]); // danh sách hiển thị ghép user + parent record
  const [editingId, setEditingId] = useState(null); // parent.id hoặc userId nếu chưa có record
  const [editForm, setEditForm] = useState({
    citizenId: "",
  });

  // Load parent + user
  const loadParents = async () => {
    try {
      const parentData = await getAllParent();
      const userResp = await getalluser();
      const users = userResp.data ?? [];

      // Ghép user role parent với record parent nếu có
      const parentsWithUser = users
        .filter(u => u.role === "parent")
        .map(u => {
          const parent = parentData.find(p => Number(p.userId) === Number(u.id));
          return {
            userId: u.id,
            user: u,
            id: parent?.id ?? null, // null nếu chưa có parent record
            citizenId: parent?.citizenId ?? "",
            updatedAt: parent?.updatedAt ?? "",
          };
        });

      setParents(parentsWithUser);
    } catch (err) {
      console.error("Load parents error:", err);
    }
  };

  useEffect(() => {
    loadParents();
  }, []);

  const openEdit = (parent) => {
    setEditingId(parent.id ?? parent.userId);
    setEditForm({
      citizenId: parent.citizenId,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ citizenId: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmEdit = async (parent) => {
  try {
    if (!editForm.citizenId) {
      alert("Vui lòng nhập CCCD!");
      return;
    }

    if (parent.id) {
      // Parent record đã có → PATCH
      await updateParent(parent.id, {
        citizenId: editForm.citizenId,
      });
    } else {
      // Parent record chưa có → POST tạo mới
      await createParent({
        userId: parent.userId,
        citizenId: editForm.citizenId,
      });
    }

    setEditingId(null);
    setEditForm({ citizenId: "" });
    await loadParents();
  } catch (err) {
    console.error("❌ Lỗi khi lưu dữ liệu:", err);
    alert("Lỗi khi lưu dữ liệu! Xem console để biết chi tiết.");
  }
};

  const handleDelete = async (id, userId, name) => {
    if (!window.confirm(`Bạn có chắc muốn xoá phụ huynh ${name}?`)) return;
    if (!id) {
      alert("Phụ huynh chưa có record, không thể xoá!");
      return;
    }
    try {
      await deleteParent(id);
      await loadParents();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xoá dữ liệu!");
    }
  };

  return (
    <div className="parent-container">
      <h2 className="parent-title">👨‍👩‍👧 Danh Sách Phụ Huynh</h2>
      <table className="parent-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID Parent</th>
            <th>Email</th>
            <th>Họ tên</th>
            <th>Phone</th>
            <th>CCCD</th>
            <th>Cập Nhật Cuối</th>
            <th>Tùy Chỉnh</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((p, index) => (
            <React.Fragment key={p.userId}>
              <tr>
                <td>{index + 1}</td>
                <td>{p.id ?? "-"}</td>
                <td>{p.user?.email ?? "-"}</td>
                <td>{p.user?.fullName ?? "-"}</td>
                <td>{p.user?.phone ?? "-"}</td>
                <td>{p.citizenId ?? "-"}</td>
                <td>{p.updatedAt ?? "-"}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEdit(p)}>✏️ Sửa</button>
                  <button className="delete-btn" onClick={() => handleDelete(p.id, p.userId, p.user?.fullName ?? p.userId)}>🗑️ Xoá</button>
                </td>
              </tr>

              {editingId === (p.id ?? p.userId) && (
                <tr>
                  <td colSpan={8}>
                    <div className="popup-overlay">
                      <div className="popup">
                        <h3>Sửa Phụ Huynh</h3>
                        <input name="email" placeholder="Email" value={p.user?.email ?? ""} readOnly />
                        <input name="fullName" placeholder="Họ tên" value={p.user?.fullName ?? ""} readOnly />
                        <input name="phone" placeholder="Phone" value={p.user?.phone ?? ""} readOnly />
                        <input name="citizenId" placeholder="CCCD" value={editForm.citizenId} onChange={handleInputChange} />
                        <div className="popup-actions">
                          <button className="btn" onClick={() => handleConfirmEdit(p)}>Lưu</button>
                          <button className="btn" onClick={handleCancel}>Hủy</button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ADListParent;