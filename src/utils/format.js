export const STATUS_META = {
  off_duty: { label: "Off Duty", color: "#0284c7", paper: "#0284c7" },
  sleeper: { label: "Sleeper Berth", color: "#7c3aed", paper: "#7c3aed" },
  driving: { label: "Driving", color: "#059669", paper: "#059669" },
  on_duty: { label: "On Duty (Not Driving)", color: "#d97706", paper: "#d97706" },
};

export const STOP_META = {
  start: { short: "S", color: "#0284c7", label: "Start" },
  pickup: { short: "P", color: "#059669", label: "Pickup" },
  dropoff: { short: "D", color: "#dc2626", label: "Drop-off" },
  fuel: { short: "F", color: "#d97706", label: "Fuel" },
  rest: { short: "R", color: "#7c3aed", label: "10-hr Rest" },
  break: { short: "B", color: "#64748b", label: "30-min Break" },
  restart: { short: "34", color: "#db2777", label: "34-hr Restart" },
};

export function fmtDateTime(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function fmtDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function fmtHours(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function shortPlace(name) {
  if (!name) return "";
  const parts = name.split(",").map((p) => p.trim());
  if (parts.length <= 2) return name;
  return `${parts[0]}, ${parts[parts.length - 3] || parts[1]}`;
}
