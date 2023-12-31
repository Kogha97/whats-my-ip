// react-leaflet imports:
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapLeaflet({ position }) {
  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          This is the location of YOUR internet provider.
          <br />
          Do you recognise it?
        </Popup>
      </Marker>
    </MapContainer>
  );
}
