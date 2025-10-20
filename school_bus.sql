-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 19, 2025 lúc 04:29 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `school_bus`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `canhbao`
--

CREATE TABLE `canhbao` (
  `MaCanhBao` int(11) NOT NULL,
  `Loai` enum('tre','su_co','khac') DEFAULT 'khac',
  `NoiDung` varchar(255) DEFAULT NULL,
  `ThoiGian` datetime DEFAULT current_timestamp(),
  `MaTaiXe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `canhbao`
--

INSERT INTO `canhbao` (`MaCanhBao`, `Loai`, `NoiDung`, `ThoiGian`, `MaTaiXe`) VALUES
(1, 'tre', 'Xe bị kẹt xe, trễ 10 phút', '2025-10-23 06:40:00', 1),
(2, 'su_co', 'Xe gặp sự cố máy lạnh', '2025-10-23 06:50:00', 2),
(3, 'khac', 'Tài xế cần hỗ trợ kỹ thuật', '2025-10-23 15:20:00', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hocsinh`
--

CREATE TABLE `hocsinh` (
  `MaHocSinh` int(11) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `Lop` varchar(20) DEFAULT NULL,
  `DiaChiDon` varchar(255) DEFAULT NULL,
  `DiaChiTra` varchar(255) DEFAULT NULL,
  `MaPhuHuynh` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `hocsinh`
--

INSERT INTO `hocsinh` (`MaHocSinh`, `HoTen`, `Lop`, `DiaChiDon`, `DiaChiTra`, `MaPhuHuynh`) VALUES
(1, 'Nguyễn Hoàng Nam', '3A', '12 Nguyễn Trãi, Q5', 'Trường DEF', 1),
(2, 'Lê Minh Anh', '2B', '45 Pasteur, Q3', 'Trường DEF', 1),
(3, 'Ngô Bảo Hân', '4C', '78 CMT8, Q10', 'Trường DEF', 2),
(4, 'Phạm Gia Huy', '1A', '23 Nguyễn Văn Linh, Q7', 'Trường DEF', 3),
(5, 'Phạm Thu Hà', '5B', '56 Điện Biên Phủ, Q10', 'Trường DEF', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichtrinh`
--

CREATE TABLE `lichtrinh` (
  `MaLich` int(11) NOT NULL,
  `Ngay` date NOT NULL,
  `GioBatDau` time DEFAULT NULL,
  `GioKetThuc` time DEFAULT NULL,
  `MaXe` int(11) DEFAULT NULL,
  `MaTaiXe` int(11) DEFAULT NULL,
  `MaTuyen` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `lichtrinh`
--

INSERT INTO `lichtrinh` (`MaLich`, `Ngay`, `GioBatDau`, `GioKetThuc`, `MaXe`, `MaTaiXe`, `MaTuyen`) VALUES
(1, '2025-10-23', '06:30:00', '07:30:00', 1, 1, 1),
(2, '2025-10-23', '06:45:00', '07:40:00', 2, 2, 4),
(3, '2025-10-23', '15:30:00', '16:30:00', 1, 1, 1),
(4, '2025-10-23', '15:40:00', '16:40:00', 2, 2, 4),
(5, '2025-10-24', '06:30:00', '07:30:00', 4, 1, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phanconghocsinh`
--

CREATE TABLE `phanconghocsinh` (
  `MaPhanCong` int(11) NOT NULL,
  `MaHocSinh` int(11) DEFAULT NULL,
  `MaLich` int(11) DEFAULT NULL,
  `TrangThai` enum('cho_don','da_don','da_tra') DEFAULT 'cho_don'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phanconghocsinh`
--

INSERT INTO `phanconghocsinh` (`MaPhanCong`, `MaHocSinh`, `MaLich`, `TrangThai`) VALUES
(1, 1, 1, 'cho_don'),
(2, 2, 1, 'cho_don'),
(3, 3, 2, 'da_don'),
(4, 4, 5, 'cho_don'),
(5, 5, 5, 'da_tra');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phuhuynh`
--

CREATE TABLE `phuhuynh` (
  `MaPhuHuynh` int(11) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `MaTaiKhoan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phuhuynh`
--

INSERT INTO `phuhuynh` (`MaPhuHuynh`, `HoTen`, `SoDienThoai`, `Email`, `MaTaiKhoan`) VALUES
(1, 'Lê Thị Hồng', '0905556677', 'hong.le@example.com', 4),
(2, 'Ngô Văn Minh', '0908889990', 'minh.ngo@example.com', 5),
(3, 'Phạm Thị Lan', '0902223344', 'lan.pham@example.com', 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `MaTaiKhoan` int(11) NOT NULL,
  `TenDangNhap` varchar(50) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `VaiTro` enum('admin','taixe','phuhuynh') NOT NULL,
  `TrangThai` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`MaTaiKhoan`, `TenDangNhap`, `MatKhau`, `VaiTro`, `TrangThai`) VALUES
(1, 'admin01', '123456', 'admin', 1),
(2, 'taixe01', '123456', 'taixe', 1),
(3, 'taixe02', '123456', 'taixe', 1),
(4, 'phuhuynh01', '123456', 'phuhuynh', 1),
(5, 'phuhuynh02', '123456', 'phuhuynh', 1),
(6, 'phuhuynh03', '123456', 'phuhuynh', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taixe`
--

CREATE TABLE `taixe` (
  `MaTaiXe` int(11) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `MaTaiKhoan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `taixe`
--

INSERT INTO `taixe` (`MaTaiXe`, `HoTen`, `SoDienThoai`, `MaTaiKhoan`) VALUES
(1, 'Nguyễn Văn A', '0901112233', 2),
(2, 'Trần Quốc B', '0903334455', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thongbao`
--

CREATE TABLE `thongbao` (
  `MaThongBao` int(11) NOT NULL,
  `TieuDe` varchar(100) DEFAULT NULL,
  `NoiDung` varchar(255) DEFAULT NULL,
  `DoiTuong` enum('taixe','phuhuynh') NOT NULL,
  `MaTaiKhoan` int(11) DEFAULT NULL,
  `ThoiGian` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thongbao`
--

INSERT INTO `thongbao` (`MaThongBao`, `TieuDe`, `NoiDung`, `DoiTuong`, `MaTaiKhoan`, `ThoiGian`) VALUES
(1, 'Xe sắp đến', 'Xe tuyến Q5 - DEF còn 5 phút nữa sẽ đến điểm đón.', 'phuhuynh', 4, '2025-10-23 06:25:00'),
(2, 'Xe đã đến trường', 'Xe Q5 - DEF đã đến trường an toàn.', 'phuhuynh', 5, '2025-10-23 07:35:00'),
(3, 'Nhắc lịch', 'Ngày mai bạn có ca lái lúc 6:30 sáng.', 'taixe', 2, '2025-10-23 18:00:00'),
(4, 'Thông báo bảo trì', 'Xe 60A-11223 cần bảo trì định kỳ.', 'taixe', 3, '2025-10-23 09:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tuyenduong`
--

CREATE TABLE `tuyenduong` (
  `MaTuyen` int(11) NOT NULL,
  `TenTuyen` varchar(100) NOT NULL,
  `DiemDau` varchar(255) DEFAULT NULL,
  `DiemCuoi` varchar(255) DEFAULT NULL,
  `QuangDuong` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tuyenduong`
--

INSERT INTO `tuyenduong` (`MaTuyen`, `TenTuyen`, `DiemDau`, `DiemCuoi`, `QuangDuong`) VALUES
(1, 'Tuyến Q5 - DEF', 'Quận 5', 'Trường DEF', 8.5),
(2, 'Tuyến Q3 - DEF', 'Quận 3', 'Trường DEF', 6),
(3, 'Tuyến Q7 - DEF', 'Quận 7', 'Trường DEF', 10.2),
(4, 'Tuyến Q10 - DEF', 'Quận 10', 'Trường DEF', 7.1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vitrixe`
--

CREATE TABLE `vitrixe` (
  `MaViTri` int(11) NOT NULL,
  `MaXe` int(11) DEFAULT NULL,
  `ThoiGian` datetime DEFAULT current_timestamp(),
  `ViDo` double DEFAULT NULL,
  `KinhDo` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `vitrixe`
--

INSERT INTO `vitrixe` (`MaViTri`, `MaXe`, `ThoiGian`, `ViDo`, `KinhDo`) VALUES
(1, 1, '2025-10-23 06:35:00', 10.762622, 106.660172),
(2, 1, '2025-10-23 06:40:00', 10.764111, 106.668222),
(3, 2, '2025-10-23 06:50:00', 10.776789, 106.682345),
(4, 2, '2025-10-23 06:55:00', 10.778999, 106.689876),
(5, 4, '2025-10-23 06:45:00', 10.732222, 106.704444);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `xebuyt`
--

CREATE TABLE `xebuyt` (
  `MaXe` int(11) NOT NULL,
  `BienSo` varchar(20) NOT NULL,
  `SoGhe` int(11) NOT NULL,
  `TrangThai` enum('hoat_dong','bao_tri','ngung') DEFAULT 'hoat_dong'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `xebuyt`
--

INSERT INTO `xebuyt` (`MaXe`, `BienSo`, `SoGhe`, `TrangThai`) VALUES
(1, '51B-12345', 30, 'hoat_dong'),
(2, '51B-67890', 35, 'hoat_dong'),
(3, '60A-11223', 25, 'bao_tri'),
(4, '59C-33445', 40, 'hoat_dong');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `canhbao`
--
ALTER TABLE `canhbao`
  ADD PRIMARY KEY (`MaCanhBao`),
  ADD KEY `MaTaiXe` (`MaTaiXe`);

--
-- Chỉ mục cho bảng `hocsinh`
--
ALTER TABLE `hocsinh`
  ADD PRIMARY KEY (`MaHocSinh`),
  ADD KEY `MaPhuHuynh` (`MaPhuHuynh`);

--
-- Chỉ mục cho bảng `lichtrinh`
--
ALTER TABLE `lichtrinh`
  ADD PRIMARY KEY (`MaLich`),
  ADD KEY `MaXe` (`MaXe`),
  ADD KEY `MaTaiXe` (`MaTaiXe`),
  ADD KEY `MaTuyen` (`MaTuyen`);

--
-- Chỉ mục cho bảng `phanconghocsinh`
--
ALTER TABLE `phanconghocsinh`
  ADD PRIMARY KEY (`MaPhanCong`),
  ADD KEY `MaHocSinh` (`MaHocSinh`),
  ADD KEY `MaLich` (`MaLich`);

--
-- Chỉ mục cho bảng `phuhuynh`
--
ALTER TABLE `phuhuynh`
  ADD PRIMARY KEY (`MaPhuHuynh`),
  ADD UNIQUE KEY `MaTaiKhoan` (`MaTaiKhoan`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`MaTaiKhoan`),
  ADD UNIQUE KEY `TenDangNhap` (`TenDangNhap`);

--
-- Chỉ mục cho bảng `taixe`
--
ALTER TABLE `taixe`
  ADD PRIMARY KEY (`MaTaiXe`),
  ADD UNIQUE KEY `MaTaiKhoan` (`MaTaiKhoan`);

--
-- Chỉ mục cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  ADD PRIMARY KEY (`MaThongBao`),
  ADD KEY `MaTaiKhoan` (`MaTaiKhoan`);

--
-- Chỉ mục cho bảng `tuyenduong`
--
ALTER TABLE `tuyenduong`
  ADD PRIMARY KEY (`MaTuyen`);

--
-- Chỉ mục cho bảng `vitrixe`
--
ALTER TABLE `vitrixe`
  ADD PRIMARY KEY (`MaViTri`),
  ADD KEY `MaXe` (`MaXe`);

--
-- Chỉ mục cho bảng `xebuyt`
--
ALTER TABLE `xebuyt`
  ADD PRIMARY KEY (`MaXe`),
  ADD UNIQUE KEY `BienSo` (`BienSo`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `canhbao`
--
ALTER TABLE `canhbao`
  MODIFY `MaCanhBao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `hocsinh`
--
ALTER TABLE `hocsinh`
  MODIFY `MaHocSinh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `lichtrinh`
--
ALTER TABLE `lichtrinh`
  MODIFY `MaLich` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `phanconghocsinh`
--
ALTER TABLE `phanconghocsinh`
  MODIFY `MaPhanCong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `phuhuynh`
--
ALTER TABLE `phuhuynh`
  MODIFY `MaPhuHuynh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `MaTaiKhoan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `taixe`
--
ALTER TABLE `taixe`
  MODIFY `MaTaiXe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  MODIFY `MaThongBao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `tuyenduong`
--
ALTER TABLE `tuyenduong`
  MODIFY `MaTuyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `vitrixe`
--
ALTER TABLE `vitrixe`
  MODIFY `MaViTri` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `xebuyt`
--
ALTER TABLE `xebuyt`
  MODIFY `MaXe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `canhbao`
--
ALTER TABLE `canhbao`
  ADD CONSTRAINT `canhbao_ibfk_1` FOREIGN KEY (`MaTaiXe`) REFERENCES `taixe` (`MaTaiXe`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `hocsinh`
--
ALTER TABLE `hocsinh`
  ADD CONSTRAINT `hocsinh_ibfk_1` FOREIGN KEY (`MaPhuHuynh`) REFERENCES `phuhuynh` (`MaPhuHuynh`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `lichtrinh`
--
ALTER TABLE `lichtrinh`
  ADD CONSTRAINT `lichtrinh_ibfk_1` FOREIGN KEY (`MaXe`) REFERENCES `xebuyt` (`MaXe`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lichtrinh_ibfk_2` FOREIGN KEY (`MaTaiXe`) REFERENCES `taixe` (`MaTaiXe`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lichtrinh_ibfk_3` FOREIGN KEY (`MaTuyen`) REFERENCES `tuyenduong` (`MaTuyen`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `phanconghocsinh`
--
ALTER TABLE `phanconghocsinh`
  ADD CONSTRAINT `phanconghocsinh_ibfk_1` FOREIGN KEY (`MaHocSinh`) REFERENCES `hocsinh` (`MaHocSinh`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `phanconghocsinh_ibfk_2` FOREIGN KEY (`MaLich`) REFERENCES `lichtrinh` (`MaLich`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `phuhuynh`
--
ALTER TABLE `phuhuynh`
  ADD CONSTRAINT `phuhuynh_ibfk_1` FOREIGN KEY (`MaTaiKhoan`) REFERENCES `taikhoan` (`MaTaiKhoan`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `taixe`
--
ALTER TABLE `taixe`
  ADD CONSTRAINT `taixe_ibfk_1` FOREIGN KEY (`MaTaiKhoan`) REFERENCES `taikhoan` (`MaTaiKhoan`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  ADD CONSTRAINT `thongbao_ibfk_1` FOREIGN KEY (`MaTaiKhoan`) REFERENCES `taikhoan` (`MaTaiKhoan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `vitrixe`
--
ALTER TABLE `vitrixe`
  ADD CONSTRAINT `vitrixe_ibfk_1` FOREIGN KEY (`MaXe`) REFERENCES `xebuyt` (`MaXe`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
