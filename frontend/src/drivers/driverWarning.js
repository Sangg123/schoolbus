import React, { useState } from "react";
import "../stylecss/driverWarning.css";
import DRWarningBox from "./driverWarningBox";

function DRWarning() {
  const [showWarnBox, setShowWarnBox] = useState(false);

  const setViewShowWarnBox = () => {
    setShowWarnBox(true);
  };

  return (
    <div className="warning-container">
      {/* Cảnh báo từ Admin */}
      <div className="admin-warning">
        <h3>⚠️ Cảnh báo từ Admin</h3>
        <p>Xe buýt tuyến A bị trễ 10 phút do kẹt xe, vui lòng thông báo cho phụ huynh.</p>
      </div>

      {/* Bảng gửi cảnh báo */}
      <div className="send-warning-section">
        <h3>📢 Gửi cảnh báo</h3>
        <table className="warning-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Lịch</th>
              <th>Tên</th>
              <th>Mã Số HS</th>
              <th>Điểm Đón</th>
              <th>Gửi Cảnh Báo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>Nguyễn Minh Khang</td>
              <td>HS001</td>
              <td>123 Nguyễn Trãi</td>
              <td>
                <button className="warning-btn" onClick={setViewShowWarnBox}>
                  💬
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>1</td>
              <td>Trần Bảo Ngọc</td>
              <td>HS002</td>
              <td>45 Lê Lợi</td>
              <td>
                <button className="warning-btn" onClick={setViewShowWarnBox}>
                  💬
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Popup cảnh báo */}
      {showWarnBox && (
        <DRWarningBox onClose={() => setShowWarnBox(false)} />
      )}
    </div>
  );
}

export default DRWarning;
