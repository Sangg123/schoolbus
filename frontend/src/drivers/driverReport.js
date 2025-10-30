import React from "react";
import "../stylecss/driverReport.css";

function DRReport() {
  return (
    <div className="report-container">
      <h3 className="report-title">📝 Báo cáo điểm danh học sinh đã đón / trả hôm nay</h3>
      <table className="report-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Lịch</th>
            <th>Tên</th>
            <th>Mã Số HS</th>
            <th>Đã Đón</th>
            <th>Đã Trả</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>Nguyễn Minh Khang</td>
            <td>HS001</td>
            <td><input type="checkbox" /></td>
            <td><input type="checkbox" /></td>
          </tr>
          <tr>
            <td>2</td>
            <td>1</td>
            <td>Trần Bảo Ngọc</td>
            <td>HS002</td>
            <td><input type="checkbox" /></td>
            <td><input type="checkbox" /></td>
          </tr>
        </tbody>
      </table>

      <div className="report-submit">
        <button type="submit">Gửi Báo Cáo</button>
      </div>
    </div>
  );
}

export default DRReport;
