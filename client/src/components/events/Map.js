import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({pos, name }) => {
  return (
    <MapContainer center={pos} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={pos}>
      <Popup>
        {name}
      </Popup>
    </Marker>
  </MapContainer>
  );

};

export default Map;
