import React, { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import LoginPopup from "./components/login";
import Home from "./pages/home";
import ManageBus from "./pages/managebus";
import MapComponent from "./components/mapcomponent";
import PRNotification from "./parents/parentNotification";
import "./App.css";
import DRViewCalendar from "./drivers/driverViewCalendar";
import DRStudentList from "./drivers/driverStudentList";
import DRReport from "./drivers/driverReport";
import DRWarning from "./drivers/driverWarning";
import ADManageAcc from "./admin/adminManageAcc";
import ADListStudents from "./admin/adminListStudents";
import ADListDrivers from "./admin/adminListDrivers";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaiTK, setLoaiTK] = useState("");

  const [showTracking, setShowTracking] = useState(false);
  const [showNotifi, setShowNotifi] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const [showAccount, setShowAccount] = useState(false);
  const [showListStudent, setShowListStudent] = useState(false);
  const [showListDriver, setShowListDriver] = useState(false);
  
  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin") {
      setLoaiTK("admin");
      setIsLoggedIn(true);
      setShowLogin(false);
      alert("Đăng nhập thành công!");
    }
    else if (username === "phuhuynh" && password === "phuhuynh") {
      setLoaiTK("phuhuynh");
      setIsLoggedIn(true);
      setShowLogin(false);
      alert("Đăng nhập thành công!");
    }
    else if (username === "taixe" && password === "taixe") {
      setLoaiTK("taixe");
      setIsLoggedIn(true);
      setShowLogin(false);
      alert("Đăng nhập thành công!");
    }
    else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  const handleLogout = ()=>{
    setIsLoggedIn(false);

    setShowTracking(false);
    setShowNotifi(false);

    setShowCalendar(false);
    setShowStudentList(false);
    setShowReport(false);
    setShowWarning(false);

    setShowAccount(false);
    setShowListStudent(false);
    setShowListDriver(false);
  }

  // chức năng menu cho parent
  const showTrackingBus=()=>{
    setShowTracking(true);
    setShowNotifi(false);
  }
  const showNotification = ()=>{
    setShowNotifi(true);
    setShowTracking(false);
  }

  // chức năng menu cho driver
  const showViewCalendar = ()=>{
    setShowCalendar(true);
    setShowStudentList(false);
    setShowReport(false);
    setShowWarning(false);
  }
  const showViewStudentList = ()=>{
    setShowStudentList(true);
    setShowCalendar(false);
    setShowReport(false);
    setShowWarning(false);
  }
  const showViewReport = ()=>{
    setShowReport(true);
    setShowStudentList(false);
    setShowCalendar(false);
    setShowWarning(false);
  }
  const showViewWarning = ()=>{
    setShowWarning(true);
    setShowReport(false);
    setShowStudentList(false);
    setShowCalendar(false);
  }

  // chức năng menu cho admin
  const showViewAcc = ()=>{
    setShowAccount(true);
    setShowListStudent(false);
    setShowListDriver(false);
  }
  const showViewListStudent = ()=>{
    setShowListStudent(true);
    setShowAccount(false);
    setShowListDriver(false);
  }
  const showViewListDriver = ()=>{
    setShowListDriver(true);
    setShowAccount(false);
    setShowListStudent(false);
  }

  return (
    <div className="app-container">
      {/* Thanh navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLogin(true)}
        loaiTK={loaiTK}
        onLogoutClick={handleLogout}
      />

      <div className="main-layout">
        {/* Sidebar hiển thị sau khi đăng nhập */}
        <Sidebar
          isLoggedIn={isLoggedIn} 
          loaiTK={loaiTK} 

          onTrackingClick={showTrackingBus} 
          onNotifiClick={showNotification}

          onViewCalendar={showViewCalendar}
          onStudentList={showViewStudentList}
          onReport={showViewReport}
          onWarning={showViewWarning}

          onManageAcc={showViewAcc}
          onListStudents={showViewListStudent}
          onListDrivers={showViewListDriver}
        />

        {/* Nội dung chính */}
        <div className="content"> 
          {!isLoggedIn && <Home />}

        {/* Parent's Menu */}
          {/* { Popup Tracking} */} 
          { showTracking && (<ManageBus/>) } 
          
          {/* Popup Notification */}
          { showNotifi && (<PRNotification/>)}

        {/* Driver's Menu */}
          {/* Popup View Calendar */}
          { showCalendar && (<DRViewCalendar/>)}

          {/* Popup Student List */}
          { showStudentList && (<DRStudentList/>)}

          {/* Popup Report */}
          { showReport && (<DRReport/>)}

          {/* Popup Warning */}
          { showWarning && (<DRWarning/>)}

        {/* Admin's Menu */}
          {/* Popup Manage Account */}
          {showAccount && (<ADManageAcc/>)}

          {/* Popup List Student */}
          {showListStudent && (<ADListStudents/>)}

          {/* Popup List Driver */}
          {showListDriver && (<ADListDrivers/>)}

        </div>
      </div>

      {/* Popup đăng nhập */}
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
