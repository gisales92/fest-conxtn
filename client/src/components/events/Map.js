import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ lat, lng }) => {
  const mapStyles = {
    height: "250px",
    width: "250px",
  };

  const center = {
    lat: Number(lat),
    lng: Number(lng),
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAi8iLhR3kh9N4LVUEjC-HvgYT9FY6PRFg">
      <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={center}>
        <Marker position={center} />
        </GoogleMap>
    </LoadScript>
  );
};

export default Map;
