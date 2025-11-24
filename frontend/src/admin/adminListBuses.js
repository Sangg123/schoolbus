import React, { useEffect, useState } from "react";
import "../stylecss/adminListBuses.css";

import getAllBusApi from "../api/getAllBus";
import createBusApi from "../api/createBus";
import modifyBusApi from "../api/modifyBus";
import deleteBusApi from "../api/deleteBus";

function ADListBus() {
  const [buses, setBuses] = useState([]);
  const [editingId, setEditingId] = useState(null); // null | id | "new"
  const [editForm, setEditForm] = useState({
    licensePlate: "",
    capacity: "",
    currentLat: "",
    currentLng: ""
  });

  const loadBuses = async () => {
    try {
      const response = await getAllBusApi("", "", "", "");
      let sorted = response?.data?.sort((a, b) => parseInt(a.id) - parseInt(b.id)) ?? [];
      setBuses(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadBuses();
  }, []);

  const openAdd = () => {
    setEditingId("new");
    setEditForm({
      licensePlate: "",
      capacity: "",
      currentLat: "",
      currentLng: ""
    });
  };

  const openEdit = (bus) => {
    setEditingId(bus.id);
    setEditForm({
      licensePlate: bus.licensePlate ?? "",
      capacity: bus.capacity ?? "",
      currentLat: bus.currentLat ?? "",
      currentLng: bus.currentLng ?? ""
    });
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm(`Bạn có chắc chắn muốn xoá xe buýt ID ${id}?`)) {
        await deleteBusApi(id);
        await loadBuses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    const { licensePlate, capacity, currentLat, currentLng } = editForm;

    if (!licensePlate || !capacity || !currentLat || !currentLng) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      if (editingId === "new") {
        await createBusApi(
          licensePlate,
          Number(capacity),
          parseFloat(currentLat),
          parseFloat(currentLng)
        );
      } else {
        await modifyBusApi(
          editingId,
          licensePlate,
          Number(capacity),
          parseFloat(currentLat),
          parseFloat(currentLng)
        );
      }
      setEditingId(null);
      await loadBuses();
    } catch (err) {
      console.error(err.response || err);
      alert("Lỗi khi lưu dữ liệu!");
    }
  };

  return (
    <div className="bus-container">
      <h2 className="bus-title">🚌 Danh Sách Xe Buýt</h2>

      <table className="bus-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Biển Số</th>
            <th>Sức Chứa</th>
            <th>Vĩ Độ</th>
            <th>Kinh Độ</th>
            <th>Cập Nhật Cuối</th>
            <th>Tùy Chỉnh</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((bus, index) => (
            <React.Fragment key={bus.id}>
              <tr>
                <td>{index + 1}</td>
                <td>{bus.id}</td>
                <td>{bus.licensePlate}</td>
                <td>{bus.capacity}</td>
                <td>{bus.currentLat}</td>
                <td>{bus.currentLng}</td>
                <td>{bus.updatedAt}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEdit(bus)}>Sửa</button>
                  <button className="delete-btn" onClick={() => handleDelete(bus.id)}>Xoá</button>
                </td>
              </tr>

              {editingId === bus.id && (
                <tr>
                  <td colSpan={8}>
                    <div className="popup-overlay">
                      <div className="popup">
                        <h3>Sửa Xe Buýt</h3>

                        <input name="licensePlate" placeholder="Biển số" value={editForm.licensePlate} onChange={handleInputChange} />
                        <input name="capacity" placeholder="Sức chứa" value={editForm.capacity} onChange={handleInputChange} />
                        <input name="currentLat" placeholder="Vĩ độ" value={editForm.currentLat} onChange={handleInputChange} />
                        <input name="currentLng" placeholder="Kinh độ" value={editForm.currentLng} onChange={handleInputChange} />

                        <div className="popup-actions">
                          <button className="btn" onClick={handleConfirm}>Lưu</button>
                          <button className="btn" onClick={() => setEditingId(null)}>Hủy</button>
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

      <div className="bus-actions">
        <button className="add-btn" onClick={openAdd}>➕ Thêm Xe Buýt</button>
      </div>

      {/* Popup thêm xe */}
      {editingId === "new" && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Thêm Xe Buýt</h3>

            <input name="licensePlate" placeholder="Biển số" value={editForm.licensePlate} onChange={handleInputChange} />
            <input name="capacity" placeholder="Sức chứa" value={editForm.capacity} onChange={handleInputChange} />
            <input name="currentLat" placeholder="Vĩ độ" value={editForm.currentLat} onChange={handleInputChange} />
            <input name="currentLng" placeholder="Kinh độ" value={editForm.currentLng} onChange={handleInputChange} />

            <div className="popup-actions">
              <button className="btn" onClick={handleConfirm}>Tạo</button>
              <button className="btn" onClick={() => setEditingId(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ADListBus;
