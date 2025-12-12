import React, { useEffect } from "react";
import "../stylecss/managebus.css";
import MapComponent from "../components/mapcomponent";
import TrackingMap from "../components/mapTracking";
import ReactDOM from "react-dom/client";

function PRTracking() {
  return (
    <div className="managebus-container">
      <h2>Theo Dõi Vị Trí Xe</h2>
      <TrackingMap />
    </div>
  );
}

export default PRTracking;
