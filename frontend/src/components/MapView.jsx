// MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ===== CUSTOM ICONS =====

// Triangle — Events
const eventIcon = new L.DivIcon({
  className: "custom-event-icon",
  html: `
    <div style="
      width: 0;
      height: 0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 20px solid #ff3b30;
      transform: translate(-6px, -10px);
    "></div>
  `,
});

// Square — Communities
const communityIcon = new L.DivIcon({
  className: "custom-community-icon",
  html: `
    <div style="
      width: 18px;
      height: 18px;
      background-color: #007aff;
      border-radius: 3px;
      transform: translate(-9px, -9px);
    "></div>
  `,
});

// ===== SAMPLE DATA =====
const locations = [
  {
    id: 1,
    type: "event",
    name: "Morning Marathon",
    lat: 28.6448,
    lng: 77.2167,
    date: "14 Dec 2025",
    description: "5 KM run with the community.",
  },
  {
    id: 2,
    type: "community",
    name: "Photography Club",
    lat: 28.6315,
    lng: 77.2210,
    members: 128,
    description: "Weekly photowalks and workshops.",
  },
];

export default function MapView() {
  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={12}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={loc.type === "event" ? eventIcon : communityIcon}
          >
            <Popup>
                <div className="p-3 rounded-lg shadow-md bg-white w-56">
                  <h2 className="text-lg font-semibold">{loc.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{loc.description}</p>

                  {loc.type === "event" && (
                    <>
                      <p className="text-xs text-gray-500 mt-2">
                        🗓 Date: {loc.date}
                      </p>

                      <button
                        className="mt-3 w-full bg-red-500 text-white text-sm py-1.5 rounded-lg hover:bg-red-600 transition"
                        onClick={() => alert("Registered for event!")}
                      >
                        Register
                      </button>
                    </>
                  )}

                  {loc.type === "community" && (
                    <>
                      <p className="text-xs text-gray-500 mt-2">
                        👥 Members: {loc.members}
                      </p>

                      <button
                        className="mt-3 w-full bg-blue-500 text-white text-sm py-1.5 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => alert("Joined community!")}
                      >
                        Join
                      </button>
                    </>
                  )}
                </div>
              </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}
