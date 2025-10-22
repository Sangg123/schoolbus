import React from "react";
import "../stylecss/managebus.css";
import MapComponent from "../components/mapcomponent";


function ManageBus() {
  return (
    <div className="managebus-container">
      <h2>Quản lý tuyến đường</h2>
      <MapComponent />
    </div>
  );
}

export default ManageBus;
