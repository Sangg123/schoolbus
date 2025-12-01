import React, { useEffect, useState } from "react";
import "../stylecss/adminManageTrip.css";

import getAllTrip from "../api/getAllTrip";
import getAllSchedule from "../api/getAllSchedule";
import getBusById from "../api/getBusById";
import getalluser from "../api/getalluser"; // join với driver để lấy tên tài xế từ user table có 
import getDriverById from "../api/getDriverById";
import getRouteById from "../api/getRouteById";
import deleteTrip from "../api/deleteTrip";
import updateTrip from "../api/updateTrip";

function AdminManageTrip() {
  const [tripList, setTripList] = useState([]);
  const [tripDetails, setTripDetails] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [formData, setFormData] = useState({
    currentStatus: "pending",
    actualStartTime: "",
    actualEndTime: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trips = await getAllTrip();
        setTripList(trips);
        const schedulesData = await getAllSchedule();
        setSchedules(schedulesData);
      } catch (err) {
        console.error("Lỗi load trip:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTripDetails = async () => {
      const details = {};
      for (const trip of tripList) {
        details[trip.id] = await getTripInfo(trip);
      }
      setTripDetails(details);
    };
    if (tripList.length) fetchTripDetails();
  }, [tripList]);

  const getTripInfo = async (trip) => {
    try {
      const schedule = await getAllSchedule().then(s => s.find(sc => sc.id === trip.scheduleId));
      const bus = await getBusById(schedule.busId);
      const driver = await getDriverById(schedule.driverId);

      // Lấy fullName từ bảng user
      const usersResp = await getalluser("", "", "", ""); 
      const users = Array.isArray(usersResp) ? usersResp : usersResp.data || [];
      const driverUser = users.find(u => u.id === driver.userId);

      const route = await getRouteById(schedule.routeId);

      return { ...trip, bus, driver: { ...driver, fullName: driverUser?.fullName || "-" }, route };
    } catch (err) {
      console.error(err);
      return trip;
    }
  };

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setFormData({
      currentStatus: trip.currentStatus,
      actualStartTime: trip.actualStartTime?.slice(0, 16) || "",
      actualEndTime: trip.actualEndTime?.slice(0, 16) || "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveTrip = async () => {
  if (!selectedTrip) return;

  try {
    console.log("FormData trước khi gửi:", formData);

    const payload = {
      currentStatus: formData.currentStatus,
      actualStartTime: formData.actualStartTime ? new Date(formData.actualStartTime).toISOString() : null,
      actualEndTime: formData.actualEndTime ? new Date(formData.actualEndTime).toISOString() : null,
    };

    console.log("Payload gửi lên API:", payload);

    const updated = await updateTrip(selectedTrip.id, payload);
    console.log("API trả về:", updated);

    setTripList(prev => prev.map(t => t.id === selectedTrip.id ? updated : t));
    setSelectedTrip(null);
  } catch (err) {
    console.error("Lỗi cập nhật trip:", err.response || err);
  }
};

  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm("Bạn có chắc muốn xoá trip này?")) return;
    try {
      await deleteTrip(tripId);
      setTripList(prev => prev.filter(t => t.id !== tripId));
    } catch (err) {
      console.error("Lỗi xoá trip:", err);
    }
  };

  return (
    <div className="trip-container">
      <h2 className="trip-title">🚍 Quản Lý Trip</h2>

      {selectedTrip && (
        <div className="trip-form">
          <h3>Sửa Trip #{selectedTrip.id}</h3>
          <select
            name="currentStatus"
            value={formData.currentStatus}
            onChange={handleChange}
          >
            <option value="pending">pending</option>
            <option value="in_progress">in_progress</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
          </select>
          <input
            type="datetime-local"
            name="actualStartTime"
            value={formData.actualStartTime}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="actualEndTime"
            value={formData.actualEndTime}
            onChange={handleChange}
          />
          <button onClick={handleSaveTrip}>💾 Cập Nhật</button>
          <button onClick={() => setSelectedTrip(null)}>✖ Huỷ</button>
        </div>
      )}

      <table className="trip-table">
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Lịch</th>
            <th>Xe</th>
            <th>Tài xế</th>
            <th>Tuyến</th>
            <th>Ngày Trip</th>
            <th>Trạng Thái</th>
            <th>Bắt Đầu Thực Tế</th>
            <th>Kết Thúc Thực Tế</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>
        <tbody>
          {tripList.map(trip => {
            const tripInfo = tripDetails[trip.id];
            if (!tripInfo) return <tr key={trip.id}><td colSpan="10">Loading...</td></tr>;
            return (
              <tr key={trip.id}>
                <td>{tripInfo.id}</td>
                <td>{`L${tripInfo.scheduleId.toString().padStart(2, "0")}`}</td>
                <td>{tripInfo.bus?.licensePlate || "-"}</td>
                <td>{tripInfo.driver?.fullName || "-"}</td>
                <td>{tripInfo.route?.name || "-"}</td>
                <td>{new Date(tripInfo.tripDate).toLocaleDateString()}</td>
                <td>{tripInfo.currentStatus}</td>
                <td>{tripInfo.actualStartTime ? new Date(tripInfo.actualStartTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : "-"}</td>
                <td>{tripInfo.actualEndTime ? new Date(tripInfo.actualEndTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : "-"}</td>
                <td>
                  <button onClick={() => handleSelectTrip(tripInfo)}>Sửa</button>
                  <button onClick={() => handleDeleteTrip(tripInfo.id)}>Xoá</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManageTrip;
