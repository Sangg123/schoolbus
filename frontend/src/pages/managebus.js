import React, { useEffect } from "react";
import "../stylecss/managebus.css";
import MapComponent from "../components/mapcomponent";
import ReactDOM from "react-dom/client";

function ManageBus() {
  return (
    <div className="managebus-container">
      <h2>Theo Dõi Vị Trí Xe</h2>
      <MapComponent />
    </div>
  );
}

export default ManageBus;
