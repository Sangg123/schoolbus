import React, { useEffect, useState } from "react";
import "../stylecss/adminManageCalendar.css";

import getAllSchedule from "../api/getAllSchedule";       // lấy tất cả lịch
import getRouteById from "../api/getRouteById";           // lấy thông tin route theo routeId
import getBusById from "../api/getBusById";               // lấy thông tin xe theo busId
import getalluser from "../api/getalluser";               // lấy tất cả user để lọc ra driver
import getDriverById from "../api/getDriverById";         // lấy thông tin driver theo driverId
import getAllItinerary from "../api/getAllItinerary";     // lấy tất cả itinerary 
import getStopPointById from "../api/getStopPointById";   // lấy thông tin stop point theo stopId
import deleteSchedule from "../api/deleteSchedule";       // xoá lịch theo scheduleId
import getAllStudent from "../api/getAllStudent";         // lấy tất cả student
import getAllStudentSchedule from "../api/getAllStudentSchedule"; // lấy tất cả student schedule
import deleteTrip from "../api/deleteTrip";             // xoá trip theo tripId
import getAllTrip from "../api/getAllTrip";              // lấy tất cả trip



function ADManageCalendar({ onCreateCalendar }) {
  const [schedules, setSchedules] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [itineraryList, setItineraryList] = useState([]);
  const [studentScheduleList, setStudentScheduleList] = useState([]);

  const dayMap = ["Chủ Nhật", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"];

  // load schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const scheduleData = await getAllSchedule();
        setSchedules(scheduleData);
      } catch (err) {
        console.error("Lỗi load schedule:", err);
      }
    };
    fetchSchedules();
  }, []);

  // load all users role driver
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await getalluser();
        const allUsers = response.data; 
        const driverUsers = allUsers.filter((u) => u.role === "driver");
        setDrivers(driverUsers);
      } catch (err) {
        console.error("Lỗi load user:", err);
      }
    };
    fetchDrivers();
  }, []);

  const handleSelectSchedule = async (schedule) => {
    try {
      const [
        bus,
        driver,
        route,
        allItinerary,
        allStudentScheduleResp,
        allStudentsResp
      ] = await Promise.all([
        getBusById(schedule.busId),
        getDriverById(schedule.driverId),
        getRouteById(schedule.routeId),
        getAllItinerary(),
        getAllStudentSchedule(),
        getAllStudent()
      ]);

      const allStudents = Array.isArray(allStudentsResp)
        ? allStudentsResp
        : allStudentsResp.data || [];
      
      const allStudentSchedule = Array.isArray(allStudentScheduleResp)
        ? allStudentScheduleResp
        : allStudentScheduleResp.data || [];

      const driverName = driver?.userId
        ? drivers.find((u) => u.id === driver.userId)?.fullName
        : null;

      setSchedules((prev) =>
        prev.map((s) =>
          s.id === schedule.id
            ? { ...s, details: { bus, driver, driverName, route } }
            : s
        )
      );

      setSelectedSchedule({ ...schedule, bus, driver, driverName, route });

      // Itinerary
      const itineraryRaw = allItinerary.filter(
        (it) => it.routeId === schedule.routeId
      );
      const itineraryWithStop = await Promise.all(
        itineraryRaw.map(async (it) => {
          const stop = await getStopPointById(it.stopId);
          return { ...it, stop };
        })
      );
      itineraryWithStop.sort((a, b) => a.stopOrder - b.stopOrder);
      setItineraryList(itineraryWithStop);

      // Student schedule
      const studentBySchedule = allStudentSchedule
        .filter(ss => ss.scheduleId === schedule.id)
        .map(ss => ({
          ...ss,
          student: allStudents.find(s => s.id === ss.studentId) || {}
        }));
      setStudentScheduleList(studentBySchedule);

    } catch (err) {
      console.error("Lỗi lấy chi tiết lịch:", err);
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    if (!window.confirm("Bạn có chắc muốn xoá lịch này?")) return;

    try {
      // 1) Lấy tất cả trip liên quan đến schedule này
      const trips = await getAllTrip(); 
      const relatedTrips = trips.filter((t) => t.scheduleId === scheduleId);

      // 2) Xoá từng trip liên quan
      for (const trip of relatedTrips) {
        await deleteTrip(trip.id);
      }

      // 3) Xoá schedule
      await deleteSchedule(scheduleId);

      // 4) Cập nhật state frontend
      setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
      setSelectedSchedule(null);
      setItineraryList([]);
      alert("Xoá lịch thành công!");
    } catch (err) {
      console.error("Lỗi xoá lịch:", err.response?.data || err);
      alert("Xoá lịch thất bại! Xem console để biết chi tiết.");
    }
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">📅 Quản Lý Lịch</h2>

      <button className="create-calendar-btn" onClick={onCreateCalendar}>
        ➕ Tạo Lịch Mới
      </button>

      <table className="calendar-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Lịch</th>
            <th>Thứ</th>
            <th>Thời Gian Bắt Đầu</th>
            <th>Xe</th>
            <th>Tài Xế</th>
            
            <th>Tuyến</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s, idx) => {
            const details = s.details || {};
            return (
              <tr key={s.id}>
                <td>{idx + 1}</td>
                <td>{`L${s.id.toString().padStart(2, "0")}`}</td>
                <td>{dayMap[s.dayOfWeek]}</td>
                <td>
                  {new Date(s.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{details.bus?.licensePlate || s.busId}</td>
                <td>{details.driverName || s.driverId}</td>
                
                <td>{details.route?.name || s.routeId}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleSelectSchedule(s)}
                  >
                    Chi tiết
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteSchedule(s.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedSchedule && (
        <div className="calendar-section">
          <h3 className="calendar-subtitle">
            📍 Chi Tiết Lộ Trình (Mã lịch: L
            {selectedSchedule.id.toString().padStart(2, "0")})
          </h3>
          
          <table className="calendar-table">
            <thead>
              <tr>
                <th>Tuyến</th>
                <th>Điểm Dừng</th>
                <th>Thứ Tự Dừng</th>
                <th>Giờ Dự Kiến</th>
              </tr>
            </thead>
            <tbody>
              {itineraryList.map((it) => (
                <tr key={it.id}>
                  <td>{selectedSchedule.route?.name}</td>
                  <td>{it.stop?.address || it.stop?.name || "Không có địa chỉ"}</td>
                  <td>{it.stopOrder}</td>
                  <td>
                    {new Date(
                      new Date(selectedSchedule.startTime).getTime() + (it.stopOrder - 1) * 10 * 60 * 1000
                    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="calendar-subtitle">👨‍🎓 Học Sinh Được Phân Công</h3>
          <table className="calendar-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Họ Tên</th>
                <th>Lớp</th>
                <th>Student Code</th>
              </tr>
            </thead>
            <tbody>
              {studentScheduleList.map(ss => {
                const student = ss.student;
                return (
                  <tr key={ss.id}>
                    <td>{student.id}</td>
                    <td>{student.fullName}</td>
                    <td>{student.class}</td>
                    <td>{student.studentCode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ADManageCalendar;
