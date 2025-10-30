import React from "react";
import "../stylecss/parentNotification.css";

function PRNotification() {
  const notifications = [
    {
      id: 1,
      sender:"Tài xế: ",
      title: "Xe buýt bị trễ 10 phút",
      message: "Xe số 03 sẽ đến muộn khoảng 10 phút do kẹt xe.",
    },
    {
      id: 2,
      sender:"Admin: ",
      title: "Cập nhật tuyến đường",
      message: "Từ ngày 30/10, xe buýt 03 sẽ đổi lộ trình đi qua đường Nguyễn Trãi.",
    },
  ];

  return (
    <div className="noti-container">
      <h3 className="noti-title">📢 Thông báo</h3>
      {notifications.map((n) => (
        <div key={n.id} className="noti-item">
          <h4>{n.sender+n.title}</h4>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
}

export default PRNotification;
