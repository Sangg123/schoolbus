import React from "react";
import "../stylecss/driverWarningBox.css";

function DRWarningBox({ onClose }) {
  return (
    <div className="warning-box-overlay">
      <div className="warning-box">
        <h3>📩 Gửi cảnh báo</h3>

        <select className="warning-select">
          <option>Xe đang trên đường đến, vui lòng chuẩn bị cho bé.</option>
          <option>Xe bị kẹt xe, dự kiến trễ 10 phút.</option>
        </select>

        <div className="warning-actions">
          <button className="send-btn">Gửi</button>
          <button className="cancel-btn" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
}

export default DRWarningBox;
