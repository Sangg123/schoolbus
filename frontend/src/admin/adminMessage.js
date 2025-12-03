import React, { useEffect, useState } from "react";
import "../stylecss/adminMessage.css";

import getAllSchedule from "../api/getAllSchedule";
import getDriverById from "../api/getDriverById";
import getalluser from "../api/getalluser";
import getAllStudentSchedule from "../api/getAllStudentSchedule";
import getAllStudent from "../api/getAllStudent";
import createNotification from "../api/createNotification";
import getAllParentStudent from "../api/getAllParentStudent";
import getAllParent from "../api/getAllParent";

function ADMessage() {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [driver, setDriver] = useState(null);
  const [parents, setParents] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [showComposer, setShowComposer] = useState(false);
  const [message, setMessage] = useState("");

  /** Load schedules */
  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await getAllSchedule();
      setSchedules(data || []);
    } catch (err) {
      console.error("[FetchSchedules] Lỗi:", err);
    }
  };

  /** Khi chọn lịch */
  const handleSelectSchedule = async (scheduleId) => {
    console.log("📌 Chọn lịch:", scheduleId);
    setSelectedSchedule(scheduleId);

    try {
      const schedules = await getAllSchedule();
      const thisSchedule = schedules.find((s) => s.id === Number(scheduleId));

      if (!thisSchedule) {
        console.error("❌ Không tìm thấy schedule!");
        return;
      }

      /** ================= DRIVER ================= */
      try {
        const driverInfo = await getDriverById(thisSchedule.driverId);
        const users = await getalluser();

        const userInfo = users.data?.find((u) => u.id === driverInfo.userId);

        setDriver({
          id: userInfo?.id,
          name: userInfo?.fullName,
        });
      } catch (err) {
        console.error("❌ Lỗi lấy tài xế:", err);
      }

      /** ================= PHỤ HUYNH ================= */
      try {
        const allStudentSchedule = await getAllStudentSchedule(); // []
        const allStudents = await getAllStudent(); // axios resp
        const allParentStudent = await getAllParentStudent(); // []
        const allParents = await getAllParent(); // []
        const allUsers = await getalluser(); // axios resp

        const studentInSchedule = allStudentSchedule.filter(
          (ss) => ss.scheduleId === Number(scheduleId)
        );

        let parentList = [];

        for (const ss of studentInSchedule) {
          // Lấy student
          const stu = allStudents.data?.find((s) => s.id === ss.studentId);
          if (!stu) continue;

          // Lấy dòng parent-student
          const relations = allParentStudent.filter(
            (ps) => ps.studentId === stu.id
          );

          for (const rel of relations) {
            const parent = allParents.find((p) => p.id === rel.parentId);
            if (!parent) continue;

            const userP = allUsers.data?.find((u) => u.id === parent.userId);
            if (!userP) continue;

            parentList.push({
              id: userP.id,
              studentName: stu.fullName,
              name: userP.fullName,
            });
          }
        }

        console.log("📌 Final parentList:", parentList);
        setParents(parentList);
      } catch (err) {
        console.error("❌ Lỗi lấy phụ huynh:", err);
      }
    } catch (err) {
      console.error("❌ Lỗi tổng:", err);
    }
  };

  /** Toggle chọn user */
  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  /** Gửi tin */
  const handleSendMessage = async () => {
    if (message.trim() === "") {
      alert("Vui lòng nhập nội dung!");
      return;
    }
    if (selectedUsers.length === 0) {
      alert("Chưa chọn người nhận!");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("userInfo"))?.user;
    const currentUserId = currentUser?.id; // lấy userId của người đang đăng nhập làm senderId

    try {
      for (const receiverId of selectedUsers) {
        await createNotification({
          senderId: currentUserId,
          receiverId,
          content: message,
          type: "info",
          isRead: false,
        });
      }

      alert("Gửi thành công!");
    } catch (err) {
      console.error("❌ Lỗi gửi tin:", err);
      alert("Lỗi gửi tin!");
    }

    setShowComposer(false);
    setMessage("");
    setSelectedUsers([]);
  };

  return (
    <div className="msg-container">
      <h2>Quản Lý Tin Nhắn</h2>

      {/* Chọn Lịch */}
      <select onChange={(e) => handleSelectSchedule(e.target.value)}>
        <option>-- Chọn lịch --</option>
        {schedules.map((s) => (
          <option value={s.id} key={s.id}>
            Lịch #{s.id}
          </option>
        ))}
      </select>

      {/* Danh sách */}
      {selectedSchedule && (
        <div className="recipient-box">
          <h3>Tài xế</h3>
          {driver && (
            <label>
              <input
                type="checkbox"
                checked={selectedUsers.includes(driver.id)}
                onChange={() => toggleSelectUser(driver.id)}
              />
              {driver.name}
            </label>
          )}

          <h3>Phụ huynh</h3>
          {parents.map((p, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={selectedUsers.includes(p.id)}
                onChange={() => toggleSelectUser(p.id)}
              />
              {p.name} (PH của {p.studentName})
            </label>
          ))}

          <button onClick={() => setShowComposer(true)}>Soạn Tin</button>
        </div>
      )}

      {/* Popup soạn tin */}
      {showComposer && (
        <div className="compose-popup">
          <div className="compose-box">
            <h3>Soạn Tin</h3>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin..."
            />

            <button onClick={() => setShowComposer(false)}>Hủy</button>
            <button onClick={handleSendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ADMessage;
