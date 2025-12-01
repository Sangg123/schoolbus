import api from "./api";

/**
 * Chuyển "06:30" → ISO 8601
 * Backend yêu cầu ISO, không chấp nhận chỉ HH:mm
 */
function convertToISO(timeStr) {
  // Lấy giờ & phút
  const [hour, minute] = timeStr.split(":");

  // Tạo object Date hôm nay
  const d = new Date();
  d.setHours(parseInt(hour), parseInt(minute), 0, 0);

  return d.toISOString();
}

const createSchedule = async (scheduleData) => {
  try {
    // Tự động convert HH:mm sang ISO
    const payload = {
      ...scheduleData,
      startTime: convertToISO(scheduleData.startTime),
      endTime: convertToISO(scheduleData.endTime ?? scheduleData.startTime), 
      // Nếu không có endTime thì tạo tạm = startTime
    };

    const res = await api.post("/schedule", payload);
    return res.data;
  } catch (err) {
    console.error("Lỗi createSchedule:", err.response?.data || err);
    throw err;
  }
};

export default createSchedule;
