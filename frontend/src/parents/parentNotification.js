import React, { useEffect, useState } from "react";
import "../stylecss/parentNotification.css";

import getAllNotification from "../api/getAllNotification";
import getalluser from "../api/getalluser";

function PRNotification() {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("userInfo"))?.user;
  const receiverId = currentUser?.id;

  useEffect(() => {
    if (!receiverId) return;

    const fetchData = async () => {
      try {
        const allNoti = await getAllNotification(); // lấy tất cả noti
        const allUsers = await getalluser();        // lấy tất cả user từ bảng users

        // Lưu users vào state
        setUsers(allUsers.data || []);

        // Lọc theo người nhận (receiverId)
        const filtered = allNoti.filter(
          (n) => n.receiverId === receiverId
        );

        setNotifications(filtered);
      } catch (err) {
        console.error("Lỗi load thông báo:", err);
      }
    };

    fetchData();
  }, [receiverId]);

  // Lấy tên người gửi (senderId -> user.fullName)
  const getSenderName = (senderId) => {
    const u = users.find((x) => x.id === senderId);
    return u ? u.fullName : "Không rõ";
  };

  return (
    <div className="noti-container">
      <h3 className="noti-title">📢 Thông báo</h3>

      {notifications.length === 0 && <p>Không có thông báo.</p>}

      {notifications.map((n) => (
        <div key={n.id} className="noti-item">
          <h4>
            {n.type === "info" ? "" : ""} 
            {getSenderName(n.senderId)}
          </h4>

          <p>{n.content}</p>

          <small>{new Date(n.sentTime).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default PRNotification;
