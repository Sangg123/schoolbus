import React, { useEffect, useState } from "react";
import "../stylecss/adminListStudents.css";

import getAllStudentApi from "../api/getAllStudent";
import correctStudentApi from "../api/correctStudent";
import getAllParentStudentApi from "../api/getAllParentStudent";
import getalluser from "../api/getalluser";
import getAllParentsApi from "../api/getAllParent";
import createParentStudentApi from "../api/createParentStudent";
import deleteParentStudentApi from "../api/deleteParentStudent";

export default function ADListStudents() {
  const [students, setStudents] = useState([]);
  const [allParents, setAllParents] = useState([]);
  const [allParentStudent, setAllParentStudent] = useState([]);

  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedParents, setSelectedParents] = useState([]);
  const [showParentPopup, setShowParentPopup] = useState(false);

  // -------------------- LOAD DATA --------------------
  const loadStudents = async () => {
    try {
      const resp = await getAllStudentApi();
      setStudents(resp?.data ?? []);
    } catch (err) {
      console.error("❌ Lỗi loadStudents:", err);
    }
  };

  const loadParents = async () => {
  try {
    const usersResp = await getalluser();
    const parentsResp = await getAllParentsApi();
    const psResp = await getAllParentStudentApi();

    // Safe fallback: nếu backend trả mảng trực tiếp thay vì { data: [...] }
    const usersData = usersResp?.data ?? usersResp ?? [];
    const parentsData = parentsResp?.data ?? parentsResp ?? [];
    const parentStudentData = psResp?.data ?? psResp ?? [];

    console.log("📌 usersData:", usersData);
    console.log("📌 parentsData:", parentsData);
    console.log("📌 parent-student relations:", parentStudentData);

    // Join parent + user
    const parentUsers = parentsData.map(parent => {
      const user = usersData.find(u => Number(u.id) === Number(parent.userId));
      if (!user) console.warn(`⚠️ Không tìm thấy userId=${parent.userId} cho parentId=${parent.id}`);
      return {
        id: parent.id,            // giữ parentId
        userId: parent.userId,    // optional, nếu cần
        fullName: user?.fullName ?? `Không có tên (${parent.userId})`
      };
    });

    console.log("📌 Loaded parents:", parentUsers);

    setAllParents(parentUsers);
    setAllParentStudent(parentStudentData);
  } catch (err) {
    console.error("❌ Lỗi loadParents:", err);
  }
};



  useEffect(() => {
    loadStudents();
    loadParents();
  }, []);

  // -------------------- HANDLE EDIT --------------------
  const openEdit = (student) => {
    const psList = allParentStudent.filter(ps => ps.studentId === student.id);
    const parentIds = psList.map(ps => ps.parentId).filter(Boolean);

    setEditingStudent(student);
    setSelectedParents(parentIds);
  };

  const toggleParent = (parentId) => {
    setSelectedParents(prev =>
      prev.includes(parentId) ? prev.filter(id => id !== parentId) : [...prev, parentId]
    );
  };

  const submitEdit = async () => {
    if (!editingStudent) return;

    try {
      console.log("📌 Xác nhận sửa học sinh:", editingStudent);
      console.log("📌 Selected parents:", selectedParents);

      // Cập nhật học sinh
      await correctStudentApi(
        editingStudent.id,
        editingStudent.fullName,
        editingStudent.class,
        editingStudent.studentCode
      );
      console.log("✅ Đã cập nhật thông tin học sinh");

      // Thêm quan hệ parent-student mới
      for (const parentId of selectedParents) {
        const exist = allParentStudent.find(
          ps => ps.studentId === editingStudent.id && ps.parentId === parentId
        );
        if (!exist) {
          console.log(`➡️ Tạo quan hệ mới: studentId=${editingStudent.id}, parentId=${parentId}`);
          await createParentStudentApi({
            studentId: editingStudent.id,
            parentId,
            relationship: "parent"
          });
          console.log(`✅ Tạo quan hệ thành công: parentId=${parentId}`);
        }
      }

      // Xóa quan hệ cũ không còn chọn
      for (const ps of allParentStudent.filter(ps => ps.studentId === editingStudent.id)) {
        if (!selectedParents.includes(ps.parentId)) {
          console.log(`❌ Xoá quan hệ: studentId=${editingStudent.id}, parentId=${ps.parentId}`);
          await deleteParentStudentApi(ps.parentId, editingStudent.id);
          console.log(`✅ Xoá quan hệ thành công: parentId=${ps.parentId}`);
        }
      }

      // Load lại dữ liệu
      await loadStudents();
      await loadParents();

      // Reset state
      setEditingStudent(null);
      setSelectedParents([]);
      setShowParentPopup(false);

      console.log("🎉 Hoàn tất cập nhật học sinh và phụ huynh");
      alert("🎉 Cập nhật học sinh và phụ huynh thành công!");
    } catch (err) {
      console.error("❌ Lỗi submitEdit:", err);
      alert("Cập nhật thất bại! Xem console để biết chi tiết.");
    }
  };

  // -------------------- RENDER --------------------
  return (
    <div className="stu-container">
      <h2 className="stu-title">🎓 Danh Sách Học Sinh</h2>
      <table className="stu-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Mã HS</th>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Tuỳ Chỉnh</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td>{s.id}</td>
              <td>{s.studentCode}</td>
              <td>{s.fullName}</td>
              <td>{s.class}</td>
              <td>
                <button className="edit-btn" onClick={() => openEdit(s)}>Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup sửa học sinh */}
      {editingStudent && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Sửa học sinh</h3>
            <input
              value={editingStudent.studentCode}
              onChange={e => setEditingStudent({ ...editingStudent, studentCode: e.target.value })}
              placeholder="Mã HS"
            />
            <input
              value={editingStudent.fullName}
              onChange={e => setEditingStudent({ ...editingStudent, fullName: e.target.value })}
              placeholder="Họ tên"
            />
            <input
              value={editingStudent.class}
              onChange={e => setEditingStudent({ ...editingStudent, class: e.target.value })}
              placeholder="Lớp"
            />

            <button
              className="btn"
              onClick={() => {
                console.log("📌 Mở popup chọn phụ huynh, allParents:", allParents);
                setShowParentPopup(true);
              }}
            >
              Chọn phụ huynh ({selectedParents.length} đã chọn)
            </button>

            <div className="popup-actions">
              <button className="btn" onClick={submitEdit}>Xác nhận</button>
              <button className="btn" onClick={() => { setEditingStudent(null); setSelectedParents([]); }}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup chọn phụ huynh */}
      {showParentPopup && (
        <div className="popup-overlay parent-popup">
          <div className="popup">
            <h3>Chọn phụ huynh cho {editingStudent?.fullName}</h3>
            <div className="parent-checkboxes">
              {allParents.map(p => (
                <label key={p.id}>
                  <input
                    type="checkbox"
                    checked={selectedParents.includes(p.id)}
                    onChange={() => toggleParent(p.id)}
                  />
                  {p.fullName}
                </label>
              ))}
            </div>
            <div className="popup-actions">
              <button
                className="btn"
                onClick={() => {
                  console.log("📌 Xác nhận phụ huynh:", selectedParents);
                  setShowParentPopup(false);
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
