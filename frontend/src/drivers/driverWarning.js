import React, { useEffect, useState } from "react";
import "../stylecss/driverWarning.css";

import DRWarningBox from "./driverWarningBox";

import getAllNotification from "../api/getAllNotification";
import getalluser from "../api/getalluser";

import getAllDriver from "../api/getAllDriver";
import getAllSchedule from "../api/getAllSchedule";
import getAllStudentSchedule from "../api/getAllStudentSchedule";
import getStudentById from "../api/getStudentById";
import getStopPointById from "../api/getStopPointById";

import getParentStudent from "../api/getAllParentStudent";
import getAllParent from "../api/getAllParent";
import createNotification from "../api/createNotification";

function DRWarning() {
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [users, setUsers] = useState([]);

  const [driverId, setDriverId] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  const [studentList, setStudentList] = useState([]);

  const [checked, setChecked] = useState({});

  const [showWarnBox, setShowWarnBox] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("userInfo"))?.user;
  const userId = currentUser?.id;   // lấy userId từ localStorage

  // ---------------------- 1. Load noti admin gửi cho tài xế ----------------------
  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      const allNoti = await getAllNotification(); // lấy tất cả noti
      const allUsers = await getalluser();      // lấy tất cả user từ bảng users
      setUsers(allUsers.data || []);

      const filtered = allNoti.filter(
        (n) => n.receiverId === userId  // lọc thông báo mà có receiverId trùng với userId hiện tại
      );

      setAdminNotifications(filtered);
    };

    load();
  }, [userId]);

  const getSenderName = (senderId) => {
    const u = users.find((x) => x.id === senderId); // lấy được senderId, tìm trong mảng users để lấy tên
    return u ? u.fullName : "Không rõ";
  };

  // ---------------------- 2. Lấy driverId từ userId ----------------------
  useEffect(() => {
    const fetchDriver = async () => {
      const all = await getAllDriver();
      const driver = all.find((d) => d.userId === userId);
      if (driver) setDriverId(driver.id);
    };

    if (userId) fetchDriver();
  }, [userId]);

  // ---------------------- 3. Lấy schedules của tài xế ----------------------
  useEffect(() => {
    if (!driverId) return;

    const load = async () => {
      const all = await getAllSchedule();
      setSchedules(all.filter((s) => s.driverId === driverId));
    };

    load();
  }, [driverId]);

  // ---------------------- 4. Khi chọn schedule → load học sinh ----------------------
  useEffect(() => {
    if (!selectedScheduleId) return;

    const load = async () => {
      const allSS = await getAllStudentSchedule();
      const list = allSS.filter((ss) => ss.scheduleId === selectedScheduleId);

      const result = await Promise.all(
        list.map(async (ss) => {
          const student = await getStudentById(ss.studentId);
          const pickup = await getStopPointById(ss.pickupStopId);

          return {
            studentId: ss.studentId,
            studentCode: student.studentCode,
            fullName: student.fullName,
            pickupAddress: pickup.address || pickup.name,
          };
        })
      );

      setStudentList(result);
    };

    load();
  }, [selectedScheduleId]);

  // ---------------------- 5. Tick chọn học sinh ----------------------
  const toggleCheck = (studentId) => {
    setChecked((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  // ---------------------- 6. Nhấn gửi cảnh báo → mở popup ----------------------
  const openWarningPopup = () => {
    const picked = Object.values(checked).some((v) => v);

    if (!picked) {
      alert("❗ Hãy chọn ít nhất 1 học sinh");
      return;
    }

    setShowWarnBox(true);
  };

  // ---------------------- 7. GỬI CẢNH BÁO ----------------------
  const sendWarning = async (content) => {
    const parentStudent = await getParentStudent();
    const allParents = await getAllParent();

    const reqs = [];

    for (const st of studentList) {
      if (!checked[st.studentId]) continue;

      const ps = parentStudent.find((x) => x.studentId === st.studentId);
      if (!ps) continue;

      const parent = allParents.find((p) => p.id === ps.parentId);
      if (!parent) continue;

      reqs.push(
        createNotification({
          senderId: userId,
          receiverId: parent.userId,
          content,
          type: "warning",
          isRead: false,
          sentTime: new Date().toISOString(),
        })
      );
    }

    await Promise.all(reqs);

    alert("✅ Gửi cảnh báo thành công!");

    setShowWarnBox(false);
    setChecked({});
  };

  // ---------------------- UI ----------------------
  return (
    <div className="warning-container">

      {/* ------------------ Cảnh báo từ Admin ------------------ */}
      <div className="admin-warning">
        <h3>⚠️ Cảnh báo từ Admin</h3>

        {adminNotifications.length === 0 && <p>Không có cảnh báo.</p>}

        {adminNotifications.map((n) => (
          <div key={n.id} className="admin-warning-item">
            <h4>{getSenderName(n.senderId)}</h4>
            <p>{n.content}</p>
            <small>{new Date(n.sentTime).toLocaleString()}</small>
          </div>
        ))}
      </div>

      {/* ------------------ Chọn lịch ------------------ */}
      <div className="send-warning-section">
        <h3>📢 Gửi cảnh báo</h3>

        <select
          className="warning-select-schedule"
          onChange={(e) => setSelectedScheduleId(Number(e.target.value))}
        >
          <option value="">-- chọn lịch --</option>
          {schedules.map((s) => (
            <option key={s.id} value={s.id}>
              Lịch L{s.id.toString().padStart(2, "0")}
            </option>
          ))}
        </select>

        <table className="warning-table">
          <thead>
            <tr>
              <th>Chọn</th>
              <th>Mã HS</th>
              <th>Tên</th>
              <th>Điểm đón</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((st) => (
              <tr key={st.studentId}>
                <td>
                  <input
                    type="checkbox"
                    checked={checked[st.studentId] || false}
                    onChange={() => toggleCheck(st.studentId)}
                  />
                </td>
                <td>{st.studentCode}</td>
                <td>{st.fullName}</td>
                <td>{st.pickupAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="warning-btn" onClick={openWarningPopup}>
          Gửi cảnh báo
        </button>
      </div>

      {/* Popup */}
      {showWarnBox && (
        <DRWarningBox
          onClose={() => setShowWarnBox(false)}
          onSend={sendWarning}
        />
      )}
    </div>
  );
}

export default DRWarning;
