import { STATUS_META, fmtDateTime, fmtHours } from "../utils/format";

const KIND_ICONS = {
  drive: "🛣️",
  pickup: "📦",
  dropoff: "🎯",
  fuel: "⛽",
  break30: "☕",
  rest10: "🌙",
  restart34: "🔄",
};

export default function Itinerary({ schedule }) {
  return (
    <div className="card itinerary" data-tour="itinerary">
      <div className="card-head">
        <div className="section-title"><span className="dot" /> Itinerary</div>
        <div className="section-sub">{schedule.length} duty events, in order</div>
      </div>

      <div className="timeline">
        {schedule.map((event, index) => {
          const meta = STATUS_META[event.status];
          return (
            <div className="tl-item" key={index}>
              <div className="tl-dot">{KIND_ICONS[event.kind] || "•"}</div>
              <div className="tl-body">
                <div className="tl-title">
                  {event.label}
                  <span
                    className="chip"
                    style={{ background: `${meta.color}22`, color: meta.color }}
                  >
                    {meta.label}
                  </span>
                </div>
                <div className="tl-meta">
                  {fmtDateTime(event.start)} → {fmtDateTime(event.end)} · {fmtHours(event.duration_hours)}
                  {event.miles > 0 && ` · ${event.miles.toLocaleString()} mi`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
