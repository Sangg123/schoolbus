import React, { useEffect, useState } from "react";
import "../stylecss/adminCreateCalendar.css";

import getAllRoute from "../api/getAllRoute";                       // lấy tất cả route
import getAllBus from "../api/getAllBus";                           // lấy tất cả bus
import getalluser from "../api/getalluser";                         // lấy tất cả user để lọc ra driver
import getAllDriver from "../api/getAllDriver";                     // lấy tất cả driver
import getAllStudent from "../api/getAllStudent";                   // lấy tất cả student
import createSchedule from "../api/createSchedule";                 // tạo 1 schedule mới
import createStudentSchedule from "../api/createStudentSchedule";   // tạo student schedule mới
import createTrip from "../api/createTrip";   // tạo trip mới
import getAllParentStudent from "../api/getAllParentStudent";         
import getAllStopPoint from "../api/getAllStopPoints";
import getAllParent from "../api/getAllParent";                

function ADCreateCalendar({ onBackManageCalendar }) {
  const [day, setDay] = useState(1); // backend: 1 = Thứ 2
  const [startTime, setStartTime] = useState("06:30");
  const [busId, setBusId] = useState(0);
  const [driverId, setDriverId] = useState(0);
  const [routeId, setRouteId] = useState(0);

  const [buses, setBuses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [students, setStudents] = useState([]);

  const [showAssign, setShowAssign] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const extractList = (resp) => {
    if (!resp) return [];
    if (Array.isArray(resp)) return resp;
    if (Array.isArray(resp.data)) return resp.data;
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const busResp = await getAllBus();
        setBuses(extractList(busResp));

        const driverResp = await getAllDriver();
        const usersResp = await getalluser("", "", "", "");
        const users = extractList(usersResp);

        const driversWithUser = users
          .filter((u) => u.role === "driver")
          .map((u) => {
            const d = driverResp.find((dr) => Number(dr.userId) === Number(u.id));
            return { id: d?.id ?? null, fullName: u.fullName };
          })
          .filter((d) => d.id !== null);
        setDrivers(driversWithUser);

        const routeResp = await getAllRoute();
        setRoutes(extractList(routeResp));

        const studentResp = await getAllStudent();
        setStudents(extractList(studentResp));
      } catch (err) {
        console.error("Load data error:", err);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      if (!busId || !driverId || !routeId) {
        alert("Vui lòng chọn xe, tài xế và tuyến!");
        return;
      }

      // 1) Tạo schedule
      const scheduleResp = await createSchedule({
        dayOfWeek: day,
        startTime,
        busId,
        driverId,
        routeId,
      });

      const scheduleId = scheduleResp?.id;
      if (!scheduleId) {
        alert("Không lấy được scheduleId!");
        return;
      }

      // 2) Gán học sinh + tạo pickup/dropoff
      const psList = await getAllParentStudent();     // load 1 lần
      const parentList = await getAllParent();        // load 1 lần
      const stopPoints = await getAllStopPoint();     // load 1 lần

      for (const studentId of selectedStudents) {
        // --- TÌM parentId qua parent-student ---
        const parentStudent = psList.find(
          (ps) => Number(ps.studentId) === Number(studentId)
        );
        if (!parentStudent) continue;

        const parentId = parentStudent.parentId;

        // --- LẤY parent để có citizenId (địa chỉ của parent) ---
        const parent = parentList.find(
          (p) => Number(p.id) === Number(parentId)
        );
        if (!parent) continue;

        const address = parent.citizenId; // chính là address của parent

        // --- pickupStopId ---
        let pickupStopId = null;

        // --- dropoffStopId ---
        let dropoffStopId = null;

        // ============ TUYẾN ĐÓN (1,2) ============
        if (routeId === 1 || routeId === 2) {
          // pickup = nhà phụ huynh
          const pickupStop = stopPoints.find((sp) => sp.address === address);
          pickupStopId = pickupStop ? pickupStop.id : null;

          // dropoff = Đại học Sài Gòn
          dropoffStopId = 1;
        }

        // ============ TUYẾN TRẢ (3,4) ============
        else if (routeId === 3 || routeId === 4) {
          // pickup = Đại học Sài Gòn
          pickupStopId = 1;

          // dropoff = nhà phụ huynh
          const dropoffStop = stopPoints.find((sp) => sp.address === address);
          dropoffStopId = dropoffStop ? dropoffStop.id : null;
        }

        // --- Tạo student-schedule ---
        await createStudentSchedule(studentId, scheduleId, pickupStopId, dropoffStopId);
      }


      // 3)Tạo trip mặc định
      await createTrip({
        scheduleId,
        tripDate: new Date().toISOString(), // ví dụ ngày hôm nay
        currentStatus: "pending",
      });

      alert("Tạo lịch + phân công học sinh thành công!");
      onBackManageCalendar();
    } catch (err) {
        if (err.response?.status === 409) {
          alert("Tuyến này đã có lịch trong ngày này! Vui lòng chọn ngày hoặc tuyến khác.");
          return;
        }

        console.error(err);
        alert("Tạo lịch thất bại!");
      }
  };

  return (
    <div className="create-calendar-container">
      <h2 className="title">📅 Tạo Lịch Mới</h2>
      <button onClick={onBackManageCalendar} className="back-btn">
        ← Quay Lại
      </button>

      <div className="form-section">
        <div className="form-row">
          <label>Chọn Thứ:</label>
          <select value={day} onChange={(e) => setDay(Number(e.target.value))}>
            {[
              { label: "Thứ 2", value: 1 },
              { label: "Thứ 3", value: 2 },
              { label: "Thứ 4", value: 3 },
              { label: "Thứ 5", value: 4 },
              { label: "Thứ 6", value: 5 },
              { label: "Thứ 7", value: 6 },
            ].map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Chọn Thời Gian Bắt Đầu:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Chọn Xe:</label>
          <select value={busId} onChange={(e) => setBusId(Number(e.target.value))}>
            <option value={0}>-- Chọn Xe --</option>
            {buses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.licensePlate}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Chọn Tài Xế:</label>
          <select
            value={driverId}
            onChange={(e) => setDriverId(Number(e.target.value))}
          >
            <option value={0}>-- Chọn Tài Xế --</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Chọn Tuyến:</label>
          <select
            value={routeId}
            onChange={(e) => setRouteId(Number(e.target.value))}
          >
            <option value={0}>-- Chọn Tuyến --</option>
            {routes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <button
            type="button"
            className="assign-btn"
            onClick={() => setShowAssign(true)}
          >
            👥 Phân Công Học Sinh
          </button>
        </div>
      </div>

      {showAssign && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Chọn Học Sinh</h3>
            <div className="student-list">
              {students.map((s) => (
                <div key={s.id}>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(s.id)}
                    onChange={(e) =>
                      setSelectedStudents((prev) =>
                        e.target.checked
                          ? [...prev, s.id]
                          : prev.filter((x) => x !== s.id)
                      )
                    }
                  />
                  {s.fullName}
                </div>
              ))}
            </div>
            <button onClick={() => setShowAssign(false)}>Xong</button>
          </div>
        </div>
      )}

      <div className="button-row">
        <button type="button" className="save-btn" onClick={handleSave}>
          💾 Tạo Lịch
        </button>
      </div>
    </div>
  );
}

export default ADCreateCalendar;
