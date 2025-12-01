import React, { useEffect, useState } from "react";
import "../stylecss/adminListRoutes.css";

import getAllRouteApi from "../api/getAllRoute";
import addRouteApi from "../api/createRoute";
import modifyRouteApi from "../api/modifyRoute";
import deleteRouteApi from "../api/deleteRoute";

import getAllStopPoints from "../api/getAllStopPoints";
import getAllItinerary from "../api/getAllItinerary";
import createItinerary from "../api/createItinerary";
import deleteItinerary from "../api/deleteItinerary";
import modifyItinerary from "../api/modifyItinerary";

function ADListRoute() {
  const [routes, setRoutes] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const [itineraryPopup, setItineraryPopup] = useState({
    visible: false,
    routeId: null,
    routeName: "",
    itineraries: [],
  });
  const [allStops, setAllStops] = useState([]);
  const [newStopId, setNewStopId] = useState("");

  // --- Load routes ---
  const getAllRoute = async () => {
    try {
      const response = await getAllRouteApi("", "");
      const sorted = response?.data?.sort((a, b) => parseInt(a.id) - parseInt(b.id)) ?? [];
      setRoutes(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllRoute();
  }, []);

  // --- CRUD Route ---
  const handleDelete = async (id) => {
    if (!window.confirm(`Xóa tuyến với ID ${id}?`)) return;
    try {
      await deleteRouteApi(id);
      await getAllRoute();
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
      if (!editForm.name.trim()) return alert("Tên tuyến không được rỗng!");
      if (editingId === "new") {
        await addRouteApi(editForm.name, editForm.description);
      } else {
        await modifyRouteApi(editingId, editForm.name, editForm.description);
      }
      setEditingId(null);
      await getAllRoute();
    } catch (err) {
      if (err.response?.status === 409) alert("Tên tuyến đã tồn tại");
      console.error(err);
    }
  };

  // --- Lộ trình ---
  const openItineraryPopup = async (route) => {
    try {
      const stops = await getAllStopPoints();
      const allItins = await getAllItinerary();
      const routeItins = allItins
        .filter((it) => it.routeId === route.id)
        .sort((a, b) => a.stopOrder - b.stopOrder)
        .map((it, idx) => ({
          ...it,
          itineraryId: it.id,
          stopOrder: idx + 1,
        }));

      setAllStops(stops);
      setItineraryPopup({
        visible: true,
        routeId: route.id,
        routeName: route.name,
        itineraries: routeItins,
      });
      setNewStopId("");
    } catch (err) {
      console.error(err);
    }
  };

  const closeItineraryPopup = () => {
    setItineraryPopup({ visible: false, routeId: null, routeName: "", itineraries: [] });
    setNewStopId("");
  };

  const handleAddStop = async () => {
    if (!newStopId) return alert("Chọn điểm dừng!");
    try {
      // Lấy stopOrder lớn nhất hiện tại
      const currentOrders = itineraryPopup.itineraries.map(it => it.stopOrder);
      const nextOrder = currentOrders.length ? Math.max(...currentOrders) + 1 : 1;

      await createItinerary(itineraryPopup.routeId, parseInt(newStopId), nextOrder);

      const updatedItins = await getAllItinerary();
      const routeItins = updatedItins
        .filter((it) => it.routeId === itineraryPopup.routeId)
        .sort((a, b) => a.stopOrder - b.stopOrder)
        .map((it, idx) => ({ ...it, itineraryId: it.id, stopOrder: idx + 1 }));

      setItineraryPopup((prev) => ({ ...prev, itineraries: routeItins }));
      setNewStopId("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItinerary = async (id) => {
  if (!window.confirm("Xóa điểm dừng này?")) return;
  try {
    await deleteItinerary(id);

    // Lấy tất cả itineraries của tuyến
    let updatedItins = await getAllItinerary();
    let routeItins = updatedItins
      .filter(it => it.routeId === itineraryPopup.routeId)
      .sort((a, b) => a.stopOrder - b.stopOrder);

    // Cập nhật lại stopOrder liên tục
    for (let i = 0; i < routeItins.length; i++) {
      const it = routeItins[i];
      if (it.stopOrder !== i + 1) {
        await modifyItinerary(it.id, { stopOrder: i + 1 });
      }
    }

    // Cập nhật state UI
    routeItins = routeItins.map((it, idx) => ({ ...it, itineraryId: it.id, stopOrder: idx + 1 }));
    setItineraryPopup(prev => ({ ...prev, itineraries: routeItins }));
  } catch (err) {
    console.error(err);
  }
};

  // --- Routes Table ---
  const routesTable = () => (
    <tbody>
      {routes.map((r, idx) => (
        <React.Fragment key={`route-${r.id}`}>
          <tr>
            <td>{idx + 1}</td>
            <td>{r.id}</td>
            <td>{r.name}</td>
            <td>{r.description}</td>
            <td>
              <button className="edit-btn" onClick={() => openEditor(r)}>Sửa</button>
              <button className="delete-btn" onClick={() => handleDelete(r.id)}>Xóa</button>
              <button className="route-btn" onClick={() => openItineraryPopup(r)}>Lộ trình</button>
            </td>
          </tr>

          {editingId === r.id && (
            <tr>
              <td colSpan={5}>
                <div className="popup-overlay correctStudent">
                  <div className="popup">
                    <h3>Sửa Tuyến</h3>
                    <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="Tên tuyến" />
                    <input name="description" value={editForm.description} onChange={handleEditChange} placeholder="Mô tả" />
                    <div className="popup-actions">
                      <button className="btn" onClick={handleConfirmEdit}>Xác nhận</button>
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
  );

  return (
    <div className="drv-container">
      <h2 className="drv-title">🛣️ Danh Sách Tuyến Đường</h2>

      <table className="drv-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Tên Tuyến</th>
            <th>Mô Tả</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>
        {routesTable()}
      </table>

      <div className="drv-actions">
        <button className="add-btn" onClick={openAdd}>➕ Thêm Tuyến</button>
      </div>

      {editingId === "new" && (
        <div className="popup-overlay correctStudent">
          <div className="popup">
            <h3>Thêm Tuyến</h3>
            <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="Tên tuyến" />
            <input name="description" value={editForm.description} onChange={handleEditChange} placeholder="Mô tả" />
            <div className="popup-actions">
              <button className="btn" onClick={handleConfirmEdit}>Tạo</button>
              <button className="btn" onClick={() => setEditingId(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Popup Lộ trình --- */}
      {itineraryPopup.visible && (
        <div className="popup-overlay">
          <div className="popup" style={{ maxWidth: "600px" }}>
            <h3>Lộ trình tuyến {itineraryPopup.routeName}</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Điểm dừng</th>
                  <th>Thứ tự dừng</th>
                  <th>Tuỳ chỉnh</th>
                </tr>
              </thead>
              <tbody>
                {itineraryPopup.itineraries.map((it, idx) => {
                  const stopName = allStops.find((s) => s.id === it.stopId)?.name || "?";
                  return (
                    <tr key={`itin-${it.itineraryId}`}>
                      <td>{idx + 1}</td>
                      <td>{stopName}</td>
                      <td>{it.stopOrder}</td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDeleteItinerary(it.itineraryId)}>Xóa</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="add-stop" style={{ marginTop: "10px" }}>
              <select value={newStopId} onChange={(e) => setNewStopId(e.target.value)}>
                <option value="">Chọn điểm dừng</option>
                {allStops.map((s) => (
                  <option key={`stop-${s.id}`} value={s.id}>{s.name}</option>
                ))}
              </select>
              <button className="add-btn" onClick={handleAddStop} style={{ marginLeft: "10px" }}>Thêm điểm dừng</button>
            </div>

            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button className="btn" onClick={closeItineraryPopup}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ADListRoute;
