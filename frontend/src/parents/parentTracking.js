import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function PRTracking() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={{ lat: 10.762622, lng: 106.660172 }}
        zoom={13}
      >
        <Marker position={{ lat: 10.762622, lng: 106.660172 }} />
      </GoogleMap>
    </LoadScript>
  );
}

export default PRTracking;
