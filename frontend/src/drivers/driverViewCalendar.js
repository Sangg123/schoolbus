import React, { useEffect, useState } from "react";
import "../stylecss/driverViewCalendar.css";

import getAllSchedule from "../api/getAllSchedule";
import getRouteById from "../api/getRouteById";
import getBusById from "../api/getBusById";
import getAllDriver from "../api/getAllDriver";     // 🔥 dùng API này để join userId → driverId
import getAllItinerary from "../api/getAllItinerary";
import getStopPointById from "../api/getStopPointById";

function DRViewCalendar() {
  const [driverId, setDriverId] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [itineraryList, setItineraryList] = useState([]);

  const dayMap = ["Chủ Nhật", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"];

  // 🟦 1. Lấy userId từ localStorage → JOIN sang driver
  useEffect(() => {
    const currentUser =
      JSON.parse(localStorage.getItem("userInfo"))?.user || null;
    const currentUserId = currentUser?.id;           // lấy userId hiện tại (test với id:20)

    const fetchDriver = async () => {
      try {
        const allDrivers = await getAllDriver();     // lấy danh sách driver

        const currentDriver = allDrivers.find(       // tìm driver ứng với userId hiện tại
          (d) => d.userId === currentUserId
        );

        if (!currentDriver) {
          console.error("❌ Không tìm thấy driver ứng với userId:", currentUserId);
          return;
        }

        setDriverId(currentDriver.id);               // đặt driverId
      } catch (err) {
        console.error("Lỗi lấy driver:", err);
      }
    };

    if (currentUserId) fetchDriver();
  }, []);

  // 🟦 2. Lấy lịch làm việc của driver
  useEffect(() => {
    if (!driverId) return;

    const fetchSchedules = async () => {
      try {
        const allSchedules = await getAllSchedule();

        const driverSchedules = allSchedules.filter(
          (s) => s.driverId === driverId
        );

        setSchedules(driverSchedules);
      } catch (err) {
        console.error("Lỗi load schedule:", err);
      }
    };

    fetchSchedules();
  }, [driverId]);

  // 🟦 3. Xem chi tiết lịch
  const handleSelectSchedule = async (schedule) => {
    try {
      const [bus, route, allItinerary] = await Promise.all([
        getBusById(schedule.busId),
        getRouteById(schedule.routeId),
        getAllItinerary(),
      ]);

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

      setSelectedSchedule({ ...schedule, bus, route });
      setItineraryList(itineraryWithStop);
    } catch (err) {
      console.error("Lỗi lấy chi tiết lịch:", err);
    }
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">🚌 Lịch làm việc của tài xế</h2>

      {/* Bảng lịch */}
      <table className="calendar-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Lịch</th>
            <th>Thứ</th>
            <th>Bắt Đầu</th>
            <th>Xe</th>
            <th>Tuyến</th>
            <th>Xem</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s, idx) => (
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
              <td>{s.busId}</td>
              <td>{s.routeId}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => handleSelectSchedule(s)}
                >
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chi tiết lộ trình */}
      {selectedSchedule && (
        <div className="calendar-section">
          <h3 className="calendar-subtitle">
            📍 Chi tiết lộ trình (Mã lịch: L
            {selectedSchedule.id.toString().padStart(2, "0")})
          </h3>

          <table className="calendar-table">
            <thead>
              <tr>
                <th>Tuyến</th>
                <th>Điểm Dừng</th>
                <th>Thứ Tự</th>
                <th>Giờ Dự Kiến</th>
              </tr>
            </thead>
            <tbody>
              {itineraryList.map((it) => (
                <tr key={it.id}>
                  <td>{selectedSchedule.route?.name}</td>
                  <td>{it.stop?.address || it.stop?.name}</td>
                  <td>{it.stopOrder}</td>
                  <td>
                    {new Date(
                      new Date(selectedSchedule.startTime).getTime() +
                        (it.stopOrder - 1) * 10 * 60 * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DRViewCalendar;
