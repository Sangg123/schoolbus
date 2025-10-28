-- ==========================================
-- CƠ SỞ DỮ LIỆU: school_bus
-- ==========================================
CREATE DATABASE IF NOT EXISTS school_bus
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE school_bus;

-- ==========================================
-- BẢNG NGƯỜI DÙNG (Admin, Tài xế, Phụ huynh)
-- ==========================================
CREATE TABLE NguoiDung (
  MaNguoiDung INT AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(255) UNIQUE NOT NULL,
  MatKhau VARCHAR(255) NOT NULL,
  HoTen VARCHAR(255) NOT NULL,
  SoDienThoai VARCHAR(20) UNIQUE,
  VaiTro ENUM('admin', 'taixe', 'phuhuynh') NOT NULL
);

-- ==========================================
-- BẢNG HỌC SINH
-- ==========================================
CREATE TABLE HocSinh (
  MaHocSinh INT AUTO_INCREMENT PRIMARY KEY,
  HoTen VARCHAR(255) NOT NULL,
  Lop VARCHAR(50),
  MaSoHocSinh VARCHAR(50) UNIQUE
);

-- ==========================================
-- BẢNG LIÊN KẾT PHỤ HUYNH - HỌC SINH (N-N)
-- ==========================================
CREATE TABLE PhuHuynh (
  MaPhuHuynh INT NOT NULL,
  MaHocSinh INT NOT NULL,
  PRIMARY KEY (MaPhuHuynh, MaHocSinh),
  FOREIGN KEY (MaPhuHuynh) REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE,
  FOREIGN KEY (MaHocSinh) REFERENCES HocSinh(MaHocSinh) ON DELETE CASCADE
);

-- ==========================================
-- BẢNG XE BUÝT
-- ==========================================
CREATE TABLE XeBuyt (
  MaXe INT AUTO_INCREMENT PRIMARY KEY,
  BienSo VARCHAR(20) UNIQUE NOT NULL,
  SucChua INT,
  ViDoHienTai DECIMAL(10, 8),
  KinhDoHienTai DECIMAL(11, 8),
  ThoiGianCapNhatCuoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- BẢNG TUYẾN ĐƯỜNG
-- ==========================================
CREATE TABLE TuyenDuong (
  MaTuyen INT AUTO_INCREMENT PRIMARY KEY,
  TenTuyen VARCHAR(255) NOT NULL,
  MoTa TEXT
);

-- ==========================================
-- BẢNG ĐIỂM DỪNG
-- ==========================================
CREATE TABLE DiemDung (
  MaDiemDung INT AUTO_INCREMENT PRIMARY KEY,
  TenDiemDung VARCHAR(255) NOT NULL,
  DiaChi TEXT,
  ViDo DECIMAL(10, 8) NOT NULL,
  KinhDo DECIMAL(11, 8) NOT NULL
);

-- ==========================================
-- BẢNG LỘ TRÌNH (Tuyến + các điểm dừng)
-- ==========================================
CREATE TABLE LoTrinh (
  MaLoTrinh INT AUTO_INCREMENT PRIMARY KEY,
  MaTuyen INT NOT NULL,
  MaDiemDung INT NOT NULL,
  ThuTuDung INT NOT NULL,
  GioDuKien TIME,
  UNIQUE (MaTuyen, ThuTuDung),
  FOREIGN KEY (MaTuyen) REFERENCES TuyenDuong(MaTuyen) ON DELETE CASCADE,
  FOREIGN KEY (MaDiemDung) REFERENCES DiemDung(MaDiemDung) ON DELETE CASCADE
);

-- ==========================================
-- BẢNG LỊCH TRÌNH (HÀNG TUẦN)
-- ==========================================
CREATE TABLE LichTrinh (
  MaLichTrinh INT AUTO_INCREMENT PRIMARY KEY,
  MaTuyen INT NOT NULL,
  MaXe INT NOT NULL,
  MaTaiXe INT NOT NULL,
  ThuTrongTuan INT NOT NULL, -- 2=Thứ 2 ... 8=Chủ nhật
  LoaiChuyen ENUM('don', 'tra') NOT NULL,
  GioBatDau TIME NOT NULL,
  UNIQUE (MaTuyen, ThuTrongTuan, LoaiChuyen),
  FOREIGN KEY (MaTuyen) REFERENCES TuyenDuong(MaTuyen),
  FOREIGN KEY (MaXe) REFERENCES XeBuyt(MaXe),
  FOREIGN KEY (MaTaiXe) REFERENCES NguoiDung(MaNguoiDung)
);

-- ==========================================
-- BẢNG PHÂN CÔNG HỌC SINH VÀO LỊCH TRÌNH
-- ==========================================
CREATE TABLE HocSinh_LichTrinh (
  MaPhanCong INT AUTO_INCREMENT PRIMARY KEY,
  MaHocSinh INT NOT NULL,
  MaLichTrinh INT NOT NULL,
  MaDiemDon INT,
  MaDiemTra INT,
  UNIQUE (MaHocSinh, MaLichTrinh),
  FOREIGN KEY (MaHocSinh) REFERENCES HocSinh(MaHocSinh) ON DELETE CASCADE,
  FOREIGN KEY (MaLichTrinh) REFERENCES LichTrinh(MaLichTrinh) ON DELETE CASCADE,
  FOREIGN KEY (MaDiemDon) REFERENCES DiemDung(MaDiemDung),
  FOREIGN KEY (MaDiemTra) REFERENCES DiemDung(MaDiemDung)
);

-- ==========================================
-- BẢNG CHUYẾN ĐI (CỤ THỂ TRONG NGÀY)
-- ==========================================
CREATE TABLE ChuyenDi (
  MaChuyen INT AUTO_INCREMENT PRIMARY KEY,
  MaLichTrinh INT NOT NULL,
  Ngay DATE NOT NULL,
  TrangThai ENUM('cho', 'dangchay', 'hoanthanh', 'huy') DEFAULT 'cho',
  GioBatDauThucTe TIMESTAMP NULL,
  GioKetThucThucTe TIMESTAMP NULL,
  UNIQUE (MaLichTrinh, Ngay),
  FOREIGN KEY (MaLichTrinh) REFERENCES LichTrinh(MaLichTrinh)
);

-- ==========================================
-- BẢNG ĐIỂM DANH
-- ==========================================
CREATE TABLE DiemDanh (
  MaDiemDanh INT AUTO_INCREMENT PRIMARY KEY,
  MaChuyen INT NOT NULL,
  MaHocSinh INT NOT NULL,
  MaDiemDung INT NOT NULL,
  HanhDong ENUM('don', 'tra', 'vang') NOT NULL,
  ThoiGian TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (MaChuyen) REFERENCES ChuyenDi(MaChuyen),
  FOREIGN KEY (MaHocSinh) REFERENCES HocSinh(MaHocSinh),
  FOREIGN KEY (MaDiemDung) REFERENCES DiemDung(MaDiemDung)
);

-- ==========================================
-- BẢNG THÔNG BÁO
-- ==========================================
CREATE TABLE ThongBao (
  MaThongBao INT AUTO_INCREMENT PRIMARY KEY,
  MaNguoiGui INT NULL,         -- Người gửi (có thể là tài xế hoặc admin)
  MaNguoiNhan INT NOT NULL,    -- Người nhận (phụ huynh hoặc tài xế)
  NoiDung TEXT NOT NULL,
  Loai ENUM('canhbao', 'thongtin', 'tre', 'sapden') NOT NULL,
  DaDoc BOOLEAN DEFAULT FALSE,
  ThoiGianGui TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (MaNguoiGui) REFERENCES NguoiDung(MaNguoiDung)
      ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (MaNguoiNhan) REFERENCES NguoiDung(MaNguoiDung)
      ON DELETE CASCADE ON UPDATE CASCADE
);
