export const STATUS_META = {
  off_duty: { label: "Off Duty", color: "#38bdf8", paper: "#0284c7" },
  sleeper: { label: "Sleeper Berth", color: "#a78bfa", paper: "#7c3aed" },
  driving: { label: "Driving", color: "#34d399", paper: "#059669" },
  on_duty: { label: "On Duty (Not Driving)", color: "#fbbf24", paper: "#d97706" },
};

export const STOP_META = {
  start: { icon: "🏁", color: "#38bdf8", label: "Start" },
  pickup: { icon: "📦", color: "#34d399", label: "Pickup" },
  dropoff: { icon: "🎯", color: "#ef4444", label: "Drop-off" },
  fuel: { icon: "⛽", color: "#fbbf24", label: "Fuel" },
  rest: { icon: "🌙", color: "#a78bfa", label: "10-hr Rest" },
  break: { icon: "☕", color: "#94a3b8", label: "30-min Break" },
  restart: { icon: "🔄", color: "#f472b6", label: "34-hr Restart" },
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
