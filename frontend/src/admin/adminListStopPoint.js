import React, { useEffect, useState } from "react";
import "../stylecss/adminListStopPoint.css";

import getAllStopPointsApi from "../api/getAllStopPoints";
import createStopPointApi from "../api/createStopPoint";
import modifyStopPointApi from "../api/modifyStopPoint";
import deleteStopPointApi from "../api/deleteStopPoint";

function ADListStopPoint() {
  const [stopPoints, setStopPoints] = useState([]);
  const [editingId, setEditingId] = useState(null); // null | id | "new"
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: ""
  });

  const loadStopPoints = async () => {
  try {
    const response = await getAllStopPointsApi();
    // Nếu API trả về mảng trực tiếp
    const sorted = (response ?? []).sort((a, b) => a.id - b.id);
    setStopPoints(sorted);
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    loadStopPoints();
  }, []);

  const openAdd = () => {
    setEditingId("new");
    setEditForm({
      name: "",
      address: "",
      latitude: "",
      longitude: ""
    });
  };

  const openEdit = (sp) => {
    setEditingId(sp.id);
    setEditForm({
      name: sp.name ?? "",
      address: sp.address ?? "",
      latitude: sp.latitude ?? "",
      longitude: sp.longitude ?? ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xoá điểm dừng ID ${id}?`)) return;
    try {
      await deleteStopPointApi(id);
      await loadStopPoints();
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    const { name, address, latitude, longitude } = editForm;

    if (!name || !address || !latitude || !longitude) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      if (editingId === "new") {
      // thêm mới
        await createStopPointApi(
            name,
            address,
            parseFloat(latitude),
            parseFloat(longitude)
      );
    } else {
      // sửa
      await modifyStopPointApi(editingId, {
        name,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
    }
    setEditingId(null);
    await loadStopPoints();
    } catch (err) {
      console.error(err.response || err);
      alert("Lỗi khi lưu dữ liệu!");
    }
  };

  return (
    <div className="stop-point-container">
      <h2 className="title">🛑 Quản Lý Điểm Dừng</h2>

      <table className="stop-point-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Tên Điểm Dừng</th>
            <th>Địa Chỉ</th>
            <th>Vĩ Độ</th>
            <th>Kinh Độ</th>
            <th>Tùy Chỉnh</th>
          </tr>
        </thead>

        <tbody>
          {stopPoints.map((sp, idx) => (
            <React.Fragment key={sp.id}>
              <tr>
                <td>{idx + 1}</td>
                <td>{sp.id}</td>
                <td>{sp.name}</td>
                <td>{sp.address}</td>
                <td>{sp.latitude}</td>
                <td>{sp.longitude}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEdit(sp)}>Sửa</button>
                  <button className="delete-btn" onClick={() => handleDelete(sp.id)}>Xoá</button>
                </td>
              </tr>

              {editingId === sp.id && (
                <tr>
                  <td colSpan={7}>
                    <div className="popup-overlay">
                      <div className="popup">
                        <h3>Chỉnh Sửa Điểm Dừng ID {sp.id}</h3>
                        <input name="name" placeholder="Tên Điểm Dừng" value={editForm.name} onChange={handleInputChange} />
                        <input name="address" placeholder="Địa Chỉ" value={editForm.address} onChange={handleInputChange} />
                        <input name="latitude" placeholder="Vĩ Độ" value={editForm.latitude} onChange={handleInputChange} />
                        <input name="longitude" placeholder="Kinh Độ" value={editForm.longitude} onChange={handleInputChange} />
                        <div className="popup-actions">
                          <button className="btn" onClick={handleConfirm}>Lưu</button>
                          <button className="btn" onClick={() => setEditingId(null)}>Huỷ</button>
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

      <div className="stop-point-actions">
        <button className="add-btn" onClick={openAdd}>➕ Thêm Điểm Dừng Mới</button>
      </div>

      {editingId === "new" && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Thêm Điểm Dừng Mới</h3>
            <input name="name" placeholder="Tên Điểm Dừng" value={editForm.name} onChange={handleInputChange} />
            <input name="address" placeholder="Địa Chỉ" value={editForm.address} onChange={handleInputChange} />
            <input name="latitude" placeholder="Vĩ Độ" value={editForm.latitude} onChange={handleInputChange} />
            <input name="longitude" placeholder="Kinh Độ" value={editForm.longitude} onChange={handleInputChange} />
            <div className="popup-actions">
              <button className="btn" onClick={handleConfirm}>Tạo</button>
              <button className="btn" onClick={() => setEditingId(null)}>Huỷ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ADListStopPoint;
