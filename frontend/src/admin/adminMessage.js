import React, { useState } from "react";
import "../stylecss/adminMessage.css";

function ADMessage() {
  const [showComposer, setShowComposer] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") {
      alert("Vui lòng nhập nội dung tin nhắn!");
      return;
    }
    alert("✅ Tin nhắn đã được gửi:\n" + message);
    setMessage("");
    setShowComposer(false);
  };

  return (
    <div className="msg-container">
      <h2 className="msg-title">💬 Quản Lý Tin Nhắn</h2>
      <div>
        <button
          className="compose-btn"
          onClick={() => setShowComposer(true)}
          title="Soạn tin nhắn mới"
        >
          ✏️ Soạn Tin
        </button>
      </div>

      {/* Nhắn tin cho tài xế */}
      <div className="msg-section">
        <h3 className="msg-subtitle">🚗 Nhắn tin cho tài xế</h3>
        <table className="msg-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Lịch</th>
              <th>Tên Tài Xế</th>
              <th>Nhắn Tin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>L01</td>
              <td>Nguyễn Văn Tài</td>
              <td>
                <button className="chat-btn" onClick={() =>setShowComposer(true)}>💬</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>L02</td>
              <td>Trần Văn Lái</td>
              <td>
                <button className="chat-btn" onClick={() =>setShowComposer(true)}>💬</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Nhắn tin cho phụ huynh */}
      <div className="msg-section">
        <h3 className="msg-subtitle">👨‍👩‍👧 Nhắn tin cho phụ huynh học sinh</h3>
        <table className="msg-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Lịch</th>
              <th>Họ Tên HS</th>
              <th>Chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>L01</td>
              <td>Nguyễn Minh Khang</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>L01</td>
              <td>Trần Bảo Ngọc</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>L02</td>
              <td>Phạm Quốc Huy</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="msg-actions">
          <button className="send-btn" onClick={() =>setShowComposer(true)}>📩 Nhắn Tin</button>
        </div>
      </div>

      {/* Popup soạn tin */}
      {showComposer && (
        <div className="compose-popup">
          <div className="compose-box">
            <h3>✏️ Soạn Tin Nhắn</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập nội dung tin nhắn..."
            ></textarea>
            <div className="compose-actions">
              <button className="cancel-btn" onClick={() => setShowComposer(false)}>
                ❌ Hủy
              </button>
              <button className="confirm-btn" onClick={handleSendMessage}>
                📤 Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ADMessage;
