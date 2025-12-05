import React, { useReducer, useState } from "react";
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
import ADListParent from "./admin/adminListParent";
import ADListDrivers from "./admin/adminListDrivers";
import ADMessage from "./admin/adminMessage";
import ADListBus from "./admin/adminListBuses";
import ADListRoute from "./admin/adminListRoutes";
import ADListStopPoint from "./admin/adminListStopPoint";
import ADManageCalendar from "./admin/adminManageCalendar";
import ADCreateCalendar from "./admin/adminCreateCalendar";
import ADManageTrip from "./admin/adminManageTrip";

import login from './api/login'
import { LoadScript } from "@react-google-maps/api";

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
  const [showListParent, setShowListParent] = useState(false);
  const [showListDriver, setShowListDriver] = useState(false);
  const [showListBus, setShowListBus] = useState(false);
  const [showListRoute, setShowListRoute] = useState(false);
  const [showStopPoint, setShowStopPoint] = useState(false);
  const [showManageCalendar, setShowManageCalendar] = useState(false);
  const [showCreateCalendar, setShowCreateCalendar] = useState(false);
  const [showManageTrip, setShowManageTrip] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const handleLogin = async (username, password) => {
    try {
      const loginRequest = await login(username, password);
      const data = loginRequest.data;
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data);
      setLoaiTK(data.user.role);
      setIsLoggedIn(true);
      setShowLogin(false);
    }
    catch (err) {
      if (err.status === 401)
        alert("Tài khoản hoặc mật khẩu không đúng");
    }
  };


  const handleLogout = () => {
    setIsLoggedIn(false);

    setShowTracking(false);
    setShowNotifi(false);

    setShowCalendar(false);
    setShowStudentList(false);
    setShowReport(false);
    setShowWarning(false);

    setShowAccount(false);
    setShowListStudent(false);
    setShowListParent(false);
    setShowListDriver(false);
    setShowListBus(false);
    setShowListRoute(false);
    setShowStopPoint(false);
    setShowManageCalendar(false);
    setShowCreateCalendar(false);
    setShowManageTrip(false);
    setShowMessage(false);

    //xoa du lieu local va session nguoi dung
    localStorage.clear();
    setUserInfo("");
  }

  // chức năng menu cho parent
  const showTrackingBus = () => {
    setShowTracking(true);
    setShowNotifi(false);
  }
  const showNotification = () => {
    setShowNotifi(true);
    setShowTracking(false);
  }

  // chức năng menu cho driver
  const showViewCalendar = () => {
    setShowCalendar(true);
    setShowStudentList(false);
    setShowReport(false);
    setShowWarning(false);
  }
  const showViewStudentList = () => {
    setShowStudentList(true);
    setShowCalendar(false);
    setShowReport(false);
    setShowWarning(false);
  }
  const showViewReport = () => {
    setShowReport(true);
    setShowStudentList(false);
    setShowCalendar(false);
    setShowWarning(false);
  }
  const showViewWarning = () => {
    setShowWarning(true);
    setShowReport(false);
    setShowStudentList(false);
    setShowCalendar(false);
  }

  // chức năng menu cho admin
  const showViewAcc = () => {
    setShowAccount(true);
    setShowListStudent(false);
    setShowListParent(false);
    setShowListDriver(false);
    setShowListBus(false);
    setShowListRoute(false);
    setShowStopPoint(false);
    setShowManageCalendar(false);
    setShowCreateCalendar(false);
    setShowManageTrip(false);
    setShowMessage(false);
  }
  const showViewListStudent = () => {
    setShowListStudent(true);
    setShowListParent(false);
    setShowAccount(false);
    setShowListDriver(false);
    setShowListBus(false);
    setShowListRoute(false);
    setShowStopPoint(false);
    setShowManageCalendar(false);
    setShowCreateCalendar(false);
    setShowManageTrip(false);
    setShowMessage(false);
  }
  const showViewListParent = () => {
    setShowListParent(true);
    setShowListStudent(false);
    setShowAccount(false);
    setShowListDriver(false);
    setShowListBus(false);
    setShowListRoute(false);
    setShowStopPoint(false);
    setShowManageCalendar(false);
    setShowCreateCalendar(false);
    setShowManageTrip(false);
    setShowMessage(false);
  }
  const showViewListDriver = () => {
    setShowListDriver(true);
    setShowAccount(false);
    setShowListStudent(false);
    setShowListParent(false);
    setShowListBus(false);
    setShowListRoute(false);
    setShowStopPoint(false);
    setShowManageCalendar(false);
    setShowCreateCalendar(false);
    setShowManageTrip(false);
    setShowMessage(false);
  }
  const showViewListBus = () => {
    setShowListBus(true);
    setShowListDriver(false);
    setShowAccount(false);
    setShowListStudent(false);
    setShowListParent(false);
    setShowListRoute(false);
    setShowStopPoint(false);
    setShowManageCalendar(false);
    setShowCreateCalendar(false);
    setShowManageTrip(false);
    setShowMessage(false);
  }
  const showViewListRoute = () => {
    setShowListRoute(true);
    setShowListBus(false);
    setShowListDriver(false);
    setShowAccount(false);
    setShowListStudent(false);
    setShowListParent(false);
    setShowStopPoint(false);
    setShowManageCalendar(false);
    setShowCreateCalendar(false);
    setShowManageTrip(false);
    setShowMessage(false);
  }
  const showViewStopPoint = () => {
    setShowStopPoint(true);
    setShowListRoute(false);
    setShowListBus(false);
    setShowListDriver(false);
    setShowAccount(false);
    setShowListStudent(false);
    setShowListParent(false);
    setShowManageCalendar(false);
    setShowCreateCalendar(false);
    setShowManageTrip(false);
    setShowMessage(false);
  }
  const showViewManageCalendar = () => {
    setShowManageCalendar(true);
    setShowListRoute(false);
    setShowListBus(false);
    setShowListDriver(false);
    setShowAccount(false);
    setShowListStudent(false);
    setShowListParent(false);
    setShowStopPoint(false);
    setShowCreateCalendar(false);
    setShowManageTrip(false);
    setShowMessage(false);
  }
  const showViewCreateCalendar = () => {
    setShowCreateCalendar(true);
    setShowManageCalendar(false);
    setShowListRoute(false);
    setShowListBus(false);
    setShowListDriver(false);
    setShowStopPoint(false);
    setShowAccount(false);
    setShowListStudent(false);
    setShowListParent(false);
    setShowManageTrip(false);
    setShowMessage(false);
  }
  const showViewMessage = () => {
    setShowMessage(true);
    setShowListDriver(false);
    setShowAccount(false);
    setShowListStudent(false);
    setShowListParent(false);
    setShowListRoute(false);
    setShowListBus(false);
    setShowStopPoint(false);
    setShowManageCalendar(false);
    setShowCreateCalendar(false);
    setShowManageTrip(false);
  }
  const showViewManageTrip = () => {
    setShowManageTrip(true);
    setShowMessage(false);
    setShowListDriver(false);
    setShowAccount(false);
    setShowListStudent(false);
    setShowListParent(false);
    setShowListRoute(false);
    setShowListBus(false);
    setShowStopPoint(false);
    setShowManageCalendar(false);
    setShowCreateCalendar(false);
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="app-container">
        {/* Thanh navbar */}
        <Navbar
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setShowLogin(true)}
          loaiTK={loaiTK}
          onLogoutClick={handleLogout}
          userInfo={userInfo}
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
            onListParents={showViewListParent}
            onListDrivers={showViewListDriver}
            onListBuses={showViewListBus}
            onListRoutes={showViewListRoute}
            onListStopPoint={showViewStopPoint}
            onManageCalendar={showViewManageCalendar}
            onManageTrip={showViewManageTrip}
            onMessage={showViewMessage}
          />

          {/* Nội dung chính */}
          <div className="content">
            {!isLoggedIn && <Home />}

            {/* Parent's Menu */}
            {/* { Popup Tracking} */}
            {showTracking && (<ManageBus />)}

            {/* Popup Notification */}
            {showNotifi && (<PRNotification />)}

            {/* Driver's Menu */}
            {/* Popup View Calendar */}
            {showCalendar && (<DRViewCalendar />)}

            {/* Popup Student List */}
            {showStudentList && (<DRStudentList />)}

            {/* Popup Report */}
            {showReport && (<DRReport />)}

            {/* Popup Warning */}
            {showWarning && (<DRWarning />)}

            {/* Admin's Menu */}
            {/* Popup Manage Account */}
            {showAccount && (<ADManageAcc />)}

            {/* Popup List Student */}
            {showListStudent && (<ADListStudents />)}

            {/* Popup List Parent */}
            {showListParent && (<ADListParent />)}

            {/* Popup List Driver */}
            {showListDriver && (<ADListDrivers />)}

            {/* Popup List Bus */}
            {showListBus && (<ADListBus />)}

            {/* Popup List Route */}
            {showListRoute && (<ADListRoute />)}

            {/* Popup List Stop Point */}
            {showStopPoint && (<ADListStopPoint />)}

            {/* Popup Manage Calendar */}
            {showManageCalendar && (<ADManageCalendar
              onCreateCalendar={showViewCreateCalendar}
            />)}

            {/* Popup Create Calendar */}
            {showCreateCalendar && (<ADCreateCalendar
              onBackManageCalendar={showViewManageCalendar}
            />)}

            {/* Popup Manage Trip */}
            {showManageTrip && (<ADManageTrip
              onBackManageCalendar={showViewManageCalendar}
            />)}

            {/* Popup Message */}
            {showMessage && (<ADMessage />)}

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
    </LoadScript>
  );
}

export default App;
