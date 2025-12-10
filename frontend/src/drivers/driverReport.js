import React, { useEffect, useState } from "react";
import "../stylecss/driverReport.css";

import getAllDriver from "../api/getAllDriver";
import getAllSchedule from "../api/getAllSchedule";
import getAllStudentSchedule from "../api/getAllStudentSchedule";
import getStudentById from "../api/getStudentById";
import getStopPointById from "../api/getStopPointById";
import getAllTrip from "../api/getAllTrip";
import createAttendance from "../api/createAttendance";
import updateAttendance from "../api/updateAttendance";
import getAllAttendance from "../api/getAllAttendance";

function DRReport() {
  const [driverId, setDriverId] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  const [studentList, setStudentList] = useState([]);
  const [tripId, setTripId] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);

  const [checked, setChecked] = useState({}); // lưu tick đón / trả

  // 🟦 1. Lấy driverId từ userId
  useEffect(() => {
    const currentUser =
      JSON.parse(localStorage.getItem("userInfo"))?.user || null;
    const userId = currentUser?.id;

    const fetchDriver = async () => {
      const drivers = await getAllDriver();
      const driver = drivers.find((d) => d.userId === userId);
      if (driver) setDriverId(driver.id);
      else console.error("❌ Không tìm thấy driver cho userId:", userId);
    };

    if (userId) fetchDriver();
  }, []);

  // 🟦 2. Lấy danh sách schedule của tài xế
  useEffect(() => {
    if (!driverId) return;

    const fetchSchedules = async () => {
      const allSchedules = await getAllSchedule();
      const driverSchedules = allSchedules.filter(
        (s) => s.driverId === driverId
      );
      setSchedules(driverSchedules);
    };

    fetchSchedules();
  }, [driverId]);

  // 🟦 3. Khi chọn schedule, load học sinh + điểm dừng
  useEffect(() => {
    if (!selectedScheduleId) return;

    const fetchStudentData = async () => {
      const allSS = await getAllStudentSchedule();
      const list = allSS.filter((ss) => ss.scheduleId === selectedScheduleId);

      const studentRows = await Promise.all(
        list.map(async (ss) => {
          const student = await getStudentById(ss.studentId);
          const pickup = await getStopPointById(ss.pickupStopId);
          const dropoff = await getStopPointById(ss.dropoffStopId);

          return {
            studentId: ss.studentId,
            studentCode: student.studentCode,
            fullName: student.fullName,
            pickupAddress: pickup.address || pickup.name,
            dropoffAddress: dropoff.address || dropoff.name,
            pickupStopId: pickup.id,
            dropoffStopId: dropoff.id,
          };
        })
      );

      setStudentList(studentRows);

      // Lấy trip theo schedule
      const allTrips = await getAllTrip();
      const t = allTrips.find((tr) => tr.scheduleId === selectedScheduleId);
      setTripId(t?.id);
    };

    fetchStudentData();
  }, [selectedScheduleId]);

  useEffect(() => {
    if (!tripId) return;

    const fetchAttendance = async () => {
      const all = await getAllAttendance(); // tất cả attendance
      const tripAttendance = all.filter((a) => a.tripId === tripId); // lọc theo tripId hiện tại 
      setAttendanceList(tripAttendance);
    };

    fetchAttendance();
  }, [tripId]);

  // 🟦 Tick checkbox
  const toggleCheck = (studentId, type) => {
    setChecked((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [type]: !prev[studentId]?.[type],
      },
    }));
  };

  // 🟦 Gửi báo cáo
  const handleSubmitReport = async () => {
    if (!tripId) {
      alert("❌ Không tìm thấy trip cho lịch này!");
      return;
    }

    const requests = [];

    for (const st of studentList) {
      const stCheck = checked[st.studentId] || {};

      // Nếu không tick gì thì bỏ qua
      if (!stCheck.pickup && !stCheck.dropoff) continue;

      // Tìm bản ghi attendance (nếu có)
      const existing = attendanceList.find(
        (a) => a.studentId === st.studentId && a.tripId === tripId
      );

      // CASE 1: Chưa có bản ghi nào → ĐÓN = CREATE
      if (!existing) {
        if (stCheck.dropoff) {
          alert(`❗ Học sinh ${st.fullName} phải ĐÓN trước rồi mới TRẢ`);
          return;
        }

        // → được phép CREATE ĐÓN
        requests.push(
          createAttendance({
            tripId,
            studentId: st.studentId,
            stopId: st.pickupStopId,
            action: "picked_up",
            timestamp: new Date().toISOString(),
          })
        );
        continue;
      }

      // CASE 2: Đã có bản ghi picked_up → TRẢ = UPDATE
      if (existing.action === "picked_up" && stCheck.dropoff) {
        requests.push(
          updateAttendance(existing.id, {
            action: "dropped_off",
            stopId: st.dropoffStopId,
            timestamp: new Date().toISOString(),
          })
        );
        continue;
      }

      // CASE 3: Đã trả rồi → không cho sửa nữa
      if (existing.action === "dropped_off") {
        alert(`❗ Học sinh ${st.fullName} đã TRẢ rồi, không cập nhật nữa`);
        return;
      }

      // CASE 4: Báo cáo đón lần 2 → không cho
      if (existing.action === "picked_up" && stCheck.pickup) {
        alert(`❗ Học sinh ${st.fullName} đã ĐÓN rồi`);
        return;
      }
    }

    // Gửi tất cả request
    await Promise.all(requests);

    alert("✅ Gửi báo cáo thành công!");

    // Reset checkbox
    setChecked({});

    // Refresh lại attendance
    const all = await getAllAttendance();
    setAttendanceList(all.filter((a) => a.tripId === tripId));
  };

  return (
    <div className="report-container">
      <h3 className="report-title">📝 Báo cáo học sinh đã đón / trả</h3>

      <label>Chọn lịch: </label>
      <select
        className="report-select"
        onChange={(e) => setSelectedScheduleId(Number(e.target.value))}
      >
        <option value="">-- chọn lịch --</option>
        {schedules.map((s) => (
          <option key={s.id} value={s.id}>
            Lịch L{s.id.toString().padStart(2, "0")}
          </option>
        ))}
      </select>

      <table className="report-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã HS</th>
            <th>Tên</th>
            <th>Địa chỉ đón</th>
            <th>Địa chỉ trả</th>
            <th>Đã đón</th>
            <th>Đã trả</th>
          </tr>
        </thead>

        <tbody>
          {studentList.map((st, idx) => (
            <tr key={st.studentId}>
              <td>{idx + 1}</td>
              <td>{st.studentCode}</td>
              <td>{st.fullName}</td>
              <td>{st.pickupAddress}</td>
              <td>{st.dropoffAddress}</td>
              <td>
                <input
                  type="checkbox"
                  checked={checked[st.studentId]?.pickup || false}
                  onChange={() => toggleCheck(st.studentId, "pickup")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={checked[st.studentId]?.dropoff || false}
                  onChange={() => toggleCheck(st.studentId, "dropoff")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-submit">
        <button onClick={handleSubmitReport}>Gửi Báo Cáo</button>
      </div>
    </div>
  );
}

export default DRReport;
