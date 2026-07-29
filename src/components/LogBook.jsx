import { motion } from "framer-motion";
import { useState } from "react";

import { fmtDate } from "../utils/format";
import Icon from "./Icon.jsx";
import LogSheet from "./LogSheet.jsx";

export default function LogBook({ logs, result }) {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="card logbook" data-tour="logbook">
      <div className="card-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="section-title"><span className="dot" /> Daily log sheets</div>
          <div className="section-sub">
            {logs.length} {logs.length === 1 ? "sheet" : "sheets"} — duty lines, totals and remarks drawn automatically
          </div>
        </div>
        <div className="log-actions">
          <button className="btn btn-ghost-dark" onClick={() => window.print()}>
            <Icon name="printer" size={15} /> Print / PDF
          </button>
        </div>
      </div>

      <div className="log-tabs">
        {logs.map((day, index) => (
          <button
            key={day.date}
            className={`log-tab ${index === activeDay ? "active" : ""}`}
            onClick={() => setActiveDay(index)}
          >
            Day {day.day_index} · {fmtDate(day.date)}
          </button>
        ))}
      </div>

      {logs.map((day, index) => (
        <motion.div
          key={day.date}
          className={`log-sheet-wrap ${index === activeDay ? "" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === activeDay ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <LogSheet day={day} result={result} />
        </motion.div>
      ))}
    </div>
  );
}
