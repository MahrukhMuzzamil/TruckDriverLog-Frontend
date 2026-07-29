import L from "leaflet";
import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";

import { STOP_META, fmtDateTime, fmtHours } from "../utils/format";

function makeIcon(type) {
  const meta = STOP_META[type] || STOP_META.start;
  return L.divIcon({
    className: "",
    html: `<div class="pin" style="background:${meta.color}"><span>${meta.icon}</span></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -26],
  });
}

function FitBounds({ geometry }) {
  const map = useMap();
  useEffect(() => {
    if (geometry?.length) {
      map.fitBounds(L.latLngBounds(geometry), { padding: [36, 36] });
    }
  }, [geometry, map]);
  return null;
}

export default function MapView({ route, stops }) {
  const icons = useMemo(
    () => Object.fromEntries(Object.keys(STOP_META).map((type) => [type, makeIcon(type)])),
    []
  );

  const legendTypes = useMemo(() => {
    const present = new Set(stops.map((stop) => stop.type));
    return Object.entries(STOP_META).filter(([type]) => present.has(type));
  }, [stops]);

  return (
    <div className="card map-card" data-tour="map">
      <div className="card-head">
        <div className="section-title"><span className="dot" /> Route & stops</div>
        <div className="section-sub">
          {route.legs.map((leg) => `${leg.name}: ${leg.distance_miles.toLocaleString()} mi`).join(" · ")}
        </div>
      </div>

      <MapContainer center={[39.5, -98.35]} zoom={4} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Polyline
          positions={route.geometry}
          pathOptions={{ color: "#ffb547", weight: 4, opacity: 0.9 }}
        />
        <Polyline
          positions={route.geometry}
          pathOptions={{ color: "#ff8a3d", weight: 9, opacity: 0.15 }}
        />
        {stops.map((stop, index) => (
          <Marker
            key={`${stop.type}-${index}`}
            position={[stop.lat, stop.lon]}
            icon={icons[stop.type] || icons.start}
          >
            <Popup>
              <strong>{STOP_META[stop.type]?.icon} {stop.label}</strong>
              <br />
              Arrive: {fmtDateTime(stop.arrival)}
              {stop.duration_hours > 0 && (
                <>
                  <br />
                  Duration: {fmtHours(stop.duration_hours)}
                </>
              )}
              <br />
              Odometer: {Math.round(stop.odometer_miles).toLocaleString()} mi
            </Popup>
          </Marker>
        ))}
        <FitBounds geometry={route.geometry} />
      </MapContainer>

      <div className="map-legend">
        {legendTypes.map(([type, meta]) => (
          <span key={type}>
            <span className="legend-dot" style={{ background: meta.color }} />
            {meta.label}
          </span>
        ))}
      </div>
    </div>
  );
}
