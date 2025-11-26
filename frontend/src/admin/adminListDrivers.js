import React, { useState, useEffect } from "react";
import "../stylecss/adminListDrivers.css";

import getalluser from "../api/getalluser";
import getAllDriver from "../api/getAllDriver";
import updateDriver from "../api/updateDriver";
import createDriver from "../api/createDriver"; // cần API tạo driver mới
import deleteDriver from "../api/deleteDriver";

export default function ADListDriver() {
  const [drivers, setDrivers] = useState([]);
  const [editingId, setEditingId] = useState(null); // driver.id đang sửa hoặc userId nếu chưa có record
  const [editForm, setEditForm] = useState({
    citizenId: "",
    licenseId: "",
  });

  // Load driver + user
  const loadDrivers = async () => {
    try {
      const driverData = await getAllDriver();
      const userResp = await getalluser("", "", "", "");
      const users = userResp.data ?? [];

      // Ghép user role driver với record driver nếu có
      const driversWithUser = users
        .filter(u => u.role === "driver")
        .map(u => {
          const driver = driverData.find(d => Number(d.userId) === Number(u.id));
          return {
            userId: u.id,
            user: u,
            id: driver?.id ?? null, // null nếu chưa có driver record
            citizenId: driver?.citizenId ?? "",
            licenseId: driver?.licenseId ?? "",
          };
        });

      const sorted = driversWithUser.sort((a, b) => (a.id ?? a.userId) - (b.id ?? b.userId));
      setDrivers(sorted);
    } catch (err) {
      console.error("Load drivers error:", err);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const openEdit = (driver) => {
    setEditingId(driver.id ?? driver.userId);
    setEditForm({
      citizenId: driver.citizenId,
      licenseId: driver.licenseId,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ citizenId: "", licenseId: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmEdit = async (driver) => {
    try {
      if (driver.id) {
        // Driver record đã có → PATCH
        await updateDriver(driver.id, {
          citizenId: editForm.citizenId,
          licenseId: editForm.licenseId,
        });
      } else {
        // Driver record chưa có → POST tạo mới
        await createDriver(driver.userId, {
          citizenId: editForm.citizenId,
          licenseId: editForm.licenseId,
        });
      }
      setEditingId(null);
      setEditForm({ citizenId: "", licenseId: "" });
      await loadDrivers();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu dữ liệu!");
    }
  };

  const handleDelete = async (id, userId, name) => {
    if (!window.confirm(`Bạn có chắc muốn xoá tài xế ${name}?`)) return;
    if (!id) {
      alert("Tài xế chưa có record, không thể xoá!");
      return;
    }
    try {
      await deleteDriver(id);
      await loadDrivers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="drv-container">
      <h2 className="drv-title">👨‍✈️ Quản lý tài xế</h2>
      <table className="drv-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID Driver</th>
            <th>Email</th>
            <th>Họ tên</th>
            <th>Phone</th>
            <th>CCCD</th>
            <th>Bằng lái</th>
            <th>Tùy Chỉnh</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d, index) => (
            <React.Fragment key={d.userId}>
              <tr>
                <td>{index + 1}</td>
                <td>{d.id ?? "-"}</td>
                <td>{d.user?.email ?? "-"}</td>
                <td>{d.user?.fullName ?? "-"}</td>
                <td>{d.user?.phone ?? "-"}</td>
                <td>{d.citizenId ?? "-"}</td>
                <td>{d.licenseId ?? "-"}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEdit(d)}>✏️ Sửa</button>
                  <button className="delete-btn" onClick={() => handleDelete(d.id, d.userId, d.user?.fullName ?? d.userId)}>🗑️ Xoá</button>
                </td>
              </tr>

              {editingId === (d.id ?? d.userId) && (
                <tr>
                  <td colSpan={8}>
                    <div className="popup-overlay">
                      <div className="popup">
                        <h3>Sửa tài xế</h3>
                        <input name="email" placeholder="Email" value={d.user?.email ?? ""} readOnly />
                        <input name="fullName" placeholder="Họ tên" value={d.user?.fullName ?? ""} readOnly />
                        <input name="phone" placeholder="Phone" value={d.user?.phone ?? ""} readOnly />
                        <input name="citizenId" placeholder="CCCD" value={editForm.citizenId} onChange={handleInputChange} />
                        <input name="licenseId" placeholder="Bằng lái" value={editForm.licenseId} onChange={handleInputChange} />
                        <div className="popup-actions">
                          <button className="btn" onClick={() => handleConfirmEdit(d)}>Lưu</button>
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
