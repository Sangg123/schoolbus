import React from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "400px" };
const center = { lat: 10.8007884, lng: 106.6304361 };

export default function MapComponent() {
  return <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13} />;
}