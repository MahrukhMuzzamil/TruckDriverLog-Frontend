import { motion } from "framer-motion";

import { fmtHours } from "../utils/format";
import Icon from "./Icon.jsx";

export default function StatsBar({ summary }) {
  const stats = [
    { icon: "road", value: summary.total_distance_miles.toLocaleString(), unit: "mi", label: "Total distance" },
    { icon: "clock", value: fmtHours(summary.driving_hours), unit: "", label: "Driving time" },
    { icon: "calendar", value: summary.days, unit: summary.days === 1 ? "day" : "days", label: "Log sheets" },
    { icon: "fuel", value: summary.fuel_stops, unit: "", label: "Fuel stops" },
    { icon: "moon", value: summary.rest_periods, unit: "", label: "10-hr rests" },
    { icon: "coffee", value: summary.breaks, unit: "", label: "30-min breaks" },
    { icon: "battery", value: `${summary.cycle_used_after}h`, unit: "/ 70", label: "Cycle after trip" },
  ];

  return (
    <div className="stats-grid" data-tour="stats">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="card stat"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
        >
          <div className="ico">
            <Icon name={stat.icon} size={17} />
          </div>
          <div className="k">
            {stat.value}
            {stat.unit && <small>{stat.unit}</small>}
          </div>
          <div className="l">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
