import React, { useState } from "react";
import "../stylecss/driverWarningBox.css";

function DRWarningBox({ onClose, onSend }) {
  const [content, setContent] = useState(
    "Xe đang trên đường đến, vui lòng chuẩn bị cho bé."
  );

  return (
    <div className="warning-box-overlay">
      <div className="warning-box">

        <h3>📢 Gửi cảnh báo</h3>

        <select
          className="warning-select"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        >
          <option>Xe đang trên đường đến, vui lòng chuẩn bị cho bé.</option>
          <option>Xe bị kẹt xe, dự kiến trễ 10 phút.</option>
        </select>

        <div className="warning-buttons">
          <button onClick={onClose}>Hủy</button>
          <button onClick={() => onSend(content)}>Gửi</button>
        </div>
      </div>
    </div>
  );
}

export default DRWarningBox;
