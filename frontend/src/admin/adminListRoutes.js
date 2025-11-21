import React, { useEffect, useState } from "react";
import "../stylecss/adminListRoutes.css";
import getAllRouteApi from "../api/getAllRoute";
import modifyRouteApi from "../api/modifyRoute";
import deleteRouteApi from "../api/deleteRoute";
import addRouteApi from "../api/createRoute"; // implement this API

function ADListRoute() {
  const [routes, setRoutes] = useState([]);
  const [editingId, setEditingId] = useState(null); // null | id | "new"
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const getAllRoute = async () => {
    try {
      const response = await getAllRouteApi("", "");
      setRoutes(response?.data ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllRoute();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm(`Xóa tuyến với id là ${id}`)) {
        await deleteRouteApi(id);
        await getAllRoute();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEditor = (r) => {
    setEditingId(r.id);
    setEditForm({ name: r.name ?? "", description: r.description ?? "" });
  };

  const openAdd = () => {
    setEditingId("new");
    setEditForm({ name: "", description: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmEdit = async () => {
    try {
      if (editingId === "new") {
        await addRouteApi(editForm.name, editForm.description);
      } else {
        await modifyRouteApi(editingId, editForm.name, editForm.description);
      }
      setEditingId(null);
      await getAllRoute();
    } catch (err) {
      if (err.response.status === 409) {
        alert("Tên tuyến đã tồn tại");
      }
      console.error(err);
    }
  };

  const routesTable = () => (
    <tbody>
      {routes.map((r, index) => (
        <React.Fragment key={r.id ?? index}>
          <tr>
            <td>{index + 1}</td>
            <td>{r.id}</td>
            <td>{r.name}</td>
            <td>{r.description}</td>
            <td>
              <button className="edit-btn" onClick={() => openEditor(r)}>Sửa</button>
              <button className="delete-btn" onClick={() => handleDelete(r.id)}>Xoá</button>
            </td>
          </tr>

          {editingId === r.id && (
            <tr>
              <td colSpan={5}>
                <div className="popup-overlay correctStudent">
                  <div className="popup">
                    <h3>Sửa Tuyến</h3>
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      placeholder="Tên tuyến"
                    />
                    <input
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder="Mô tả"
                    />
                    <div className="popup-actions">
                      <button onClick={handleConfirmEdit} className="btn">Xác nhận</button>
                      <button onClick={() => setEditingId(null)} className="btn">Hủy</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  );

  return (
    <div className="drv-container">
      <h2 className="drv-title">🛣️ Danh Sách Tuyến Đường</h2>

      <table className="drv-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Tuyến</th>
            <th>Tên Tuyến</th>
            <th>Mô Tả</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>
        {routesTable()}
      </table>

      <div className="drv-actions">
        <button
          className="add-btn"
          onClick={openAdd}
        >
          ➕ Thêm Tuyến
        </button>
      </div>

      {editingId === "new" && (
        <div className="popup-overlay correctStudent">
          <div className="popup">
            <h3>Thêm Tuyến</h3>
            <input
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Tên tuyến"
            />
            <input
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
              placeholder="Mô tả"
            />
            <div className="popup-actions">
              <button onClick={handleConfirmEdit} className="btn">Tạo</button>
              <button onClick={() => setEditingId(null)} className="btn">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ADListRoute;