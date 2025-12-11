import React, { useState, useEffect } from "react";
import "../stylecss/adminListParent.css";

import getalluser from "../api/getalluser";
import getAllParent from "../api/getAllParent";
import updateParent from "../api/updateParent";
import createParent from "../api/createParent";
import deleteParent from "../api/deleteParent";
import getAllStopPoint from "../api/getAllStopPoints";

function ADListParent() {
  const [parents, setParents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    citizenId: "",
  });

  const [stopPoints, setStopPoints] = useState([]); //  Danh sách điểm dừng

  //  Load parent + user
  const loadParents = async () => {
    try {
      const parentData = await getAllParent();
      const userResp = await getalluser();
      const users = userResp.data ?? [];

      const parentsWithUser = users
        .filter((u) => u.role === "parent")
        .map((u) => {
          const parent = parentData.find((p) => Number(p.userId) === Number(u.id));
          return {
            userId: u.id,
            user: u,
            id: parent?.id ?? null,
            citizenId: parent?.citizenId ?? "",
            updatedAt: parent?.updatedAt ?? "",
          };
        });

      setParents(parentsWithUser);
    } catch (err) {
      console.error("Load parents error:", err);
    }
  };

  //  Load stop-point list
  const loadStopPoints = async () => {
    try {
      const spResp = await getAllStopPoint();
      setStopPoints(spResp ?? []);
    } catch (err) {
      console.error("Load stop point error:", err);
    }
  };

  useEffect(() => {
    loadParents();
    loadStopPoints();
  }, []);

  const openEdit = (parent) => {
    setEditingId(parent.id ?? parent.userId);

    setEditForm({
      citizenId: parent.citizenId, // address hiện tại
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ citizenId: "" });
  };

  const handleConfirmEdit = async (parent) => {
    try {
      if (!editForm.citizenId) {
        alert("Vui lòng chọn địa chỉ (stop point)!");
        return;
      }

      const payload = {
        citizenId: editForm.citizenId, // address Selected
      };

      if (parent.id) {
        await updateParent(parent.id, payload);
      } else {
        await createParent({
          userId: parent.userId,
          ...payload,
        });
      }

      setEditingId(null);
      setEditForm({ citizenId: "" });
      await loadParents();
    } catch (err) {
      console.error("❌ Lỗi khi lưu dữ liệu:", err);
      alert("Lỗi khi lưu dữ liệu!");
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
            <th>Địa Chỉ Đón HS</th>
            
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

                {/* Hiển thị địa chỉ (citizenId) */}
                <td>{p.citizenId || "-"}</td>

                

                <td>
                  <button className="edit-btn" onClick={() => openEdit(p)}>
                    ✏️ Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p.id, p.userId, p.user?.fullName)}
                  >
                    🗑️ Xoá
                  </button>
                </td>
              </tr>

              {/* Popup sửa */}
              {editingId === (p.id ?? p.userId) && (
                <tr>
                  <td colSpan={8}>
                    <div className="popup-overlay">
                      <div className="popup">
                        <h3>Sửa Thông Tin Phụ Huynh</h3>

                        <input value={p.user?.email} readOnly />
                        <input value={p.user?.fullName} readOnly />
                        <input value={p.user?.phone} readOnly />

                        {/* Select Stop Point */}
                        <select
                          name="citizenId"
                          value={editForm.citizenId}
                          onChange={(e) =>
                            setEditForm({ citizenId: e.target.value })
                          }
                        >
                          <option value="">-- Chọn địa chỉ đón/trả --</option>
                          {stopPoints.map((sp) => (
                            <option key={sp.id} value={sp.address}>
                              {sp.name} - {sp.address}
                            </option>
                          ))}
                        </select>

                        <div className="popup-actions">
                          <button className="btn" onClick={() => handleConfirmEdit(p)}>
                            Lưu
                          </button>
                          <button className="btn" onClick={handleCancel}>
                            Hủy
                          </button>
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
