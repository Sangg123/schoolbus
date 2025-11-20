import React, { useEffect, useState } from "react";
import "../stylecss/adminListStudents.css";
import createStudentApi from "../api/createStudent";
import getAllStudentApi from "../api/getAllStudent";

function ADListStudents() {
  const [students, setStudents] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [student, setStudent] = useState({ fullName: "", classes: "", studentCode: "" });

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await getAllStudentApi();
        const raw = resp?.data ?? [];
        // normalize server "class" field to "classes"
        const normalized = raw.map(s => ({
          id: s.id,
          fullName: s.fullName,
          studentCode: s.studentCode,
          classes: s["class"] ?? s.classes ?? "" // prefer server "class"
        }));
        setStudents(normalized);
      } catch (err) {
        console.error("fetch students:", err);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const submitAdd = async () => {
    try {
      const resp = await createStudentApi(student.fullName, student.classes, student.studentCode);
      const createdRaw = resp?.data;
      if (createdRaw) {
        const created = {
          id: createdRaw.id,
          fullName: createdRaw.fullName,
          studentCode: createdRaw.studentCode,
          classes: createdRaw["class"] ?? createdRaw.classes ?? ""
        };
        setStudents(prev => [created, ...prev]);
      } else {
        const all = await getAllStudentApi();
        const normalized = (all?.data ?? []).map(s => ({
          id: s.id,
          fullName: s.fullName,
          studentCode: s.studentCode,
          classes: s["class"] ?? s.classes ?? ""
        }));
        setStudents(normalized);
      }
      setStudent({ fullName: "", classes: "", studentCode: "" });
      setShowAdd(false);
    } catch (err) {
      console.error("create student:", err);
      alert("Create student failed");
    }
  };

  const studentRow = (s, i) => {
    const { id, fullName, studentCode, classes } = s ?? {};
    return (
      <tr key={id ?? i}>
        <td>{i + 1}</td>
        <td>{studentCode}</td>
        <td>{fullName}</td>
        <td>{classes}</td>
        <td>
          <button className="edit-btn">Sửa</button>
          <button className="delete-btn">Xoá</button>
        </td>
      </tr>
    );
  };

  return (
    <div className="stu-container">
      <h2 className="stu-title">🎓 Danh Sách Học Sinh</h2>

      <table className="stu-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Học Sinh</th>
            <th>Họ Tên</th>
            <th>Lớp</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>
        <tbody>
          {students.map(studentRow)}
        </tbody>
      </table>

      <div className="stu-actions">
        <button className="add-btn" onClick={() => setShowAdd(true)}>➕ Thêm Học Sinh</button>
      </div>

      {showAdd && (
        <div className="popup-overlay">
          <div className="addstudent popup">
            <h3>Thêm học sinh</h3>
            <input name="studentCode" value={student.studentCode} onChange={handleChange} placeholder="Mã học sinh" />
            <input name="fullName" value={student.fullName} onChange={handleChange} placeholder="Họ tên" />
            <input name="classes" value={student.classes} onChange={handleChange} placeholder="Lớp" />
            <div className="popup-actions">
              <button onClick={submitAdd} className="btn">Xác nhận</button>
              <button onClick={() => { setShowAdd(false); setStudent({ fullName: "", classes: "", studentCode: "" }); }} className="btn">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ADListStudents;