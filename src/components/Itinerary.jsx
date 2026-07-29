import { STATUS_META, fmtDateTime, fmtHours } from "../utils/format";
import Icon from "./Icon.jsx";

const KIND_ICONS = {
  drive: "truck",
  pickup: "package",
  dropoff: "target",
  fuel: "fuel",
  break30: "coffee",
  rest10: "moon",
  restart34: "refresh",
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
              <div className="tl-dot">
                <Icon name={KIND_ICONS[event.kind] || "clock"} size={13} strokeWidth={2} />
              </div>
              <div className="tl-body">
                <div className="tl-title">
                  {event.label}
                  <span
                    className="chip"
                    style={{ background: `${meta.color}1a`, color: meta.color }}
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
