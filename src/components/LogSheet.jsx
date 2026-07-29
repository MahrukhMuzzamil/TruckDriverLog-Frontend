import { STATUS_META } from "../utils/format";

/**
 * Draws one FMCSA "Driver's Daily Log" sheet as an SVG:
 * 24-hour grid with quarter-hour ticks, the four duty rows, the continuous
 * duty line stepped between rows, per-status totals and the remarks section.
 */

// Grid geometry
const X0 = 150; // grid left
const COL_W = 36; // one hour
const GRID_W = 24 * COL_W;
const Y0 = 152; // grid top
const ROW_H = 42;
const GRID_H = 4 * ROW_H;
const X_TOTALS = X0 + GRID_W + 10;

const ROWS = ["off_duty", "sleeper", "driving", "on_duty"];
const ROW_LABELS = ["1. Off Duty", "2. Sleeper Berth", "3. Driving", "4. On Duty (not driving)"];

const INK = "#1e293b";
const INK_SOFT = "#64748b";
const PAPER = "#ffffff";
const GRID_LINE = "#c3cbd8";

const xAt = (hour) => X0 + hour * COL_W;
const rowCenter = (status) => Y0 + ROWS.indexOf(status) * ROW_H + ROW_H / 2;

function hourLabel(hour) {
  if (hour === 0 || hour === 24) return "Mid";
  if (hour === 12) return "Noon";
  return String(hour);
}

function DutyLine({ segments }) {
  const parts = [];
  segments.forEach((segment, index) => {
    const y = rowCenter(segment.status);
    const x1 = xAt(segment.start_hour);
    const x2 = xAt(segment.end_hour);
    if (index > 0) {
      const prevY = rowCenter(segments[index - 1].status);
      if (prevY !== y) {
        parts.push(
          <line key={`v${index}`} x1={x1} y1={prevY} x2={x1} y2={y} stroke={INK} strokeWidth="1.6" />
        );
      }
    }
    parts.push(
      <line
        key={`h${index}`}
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke={STATUS_META[segment.status].paper}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    );
  });
  return <g>{parts}</g>;
}

export default function LogSheet({ day, result }) {
  const inputs = result.inputs;
  const [year, month, dayNum] = day.date.split("-");
  const totalHours = Object.values(day.totals).reduce((a, b) => a + b, 0);

  const ticks = [];
  for (let hour = 0; hour < 24; hour += 1) {
    for (const quarter of [0.25, 0.5, 0.75]) {
      const x = xAt(hour + quarter);
      const length = quarter === 0.5 ? 10 : 6;
      for (let row = 0; row < 4; row += 1) {
        const yTop = Y0 + row * ROW_H;
        ticks.push(
          <line key={`t${hour}-${quarter}-${row}`} x1={x} y1={yTop} x2={x} y2={yTop + length} stroke={GRID_LINE} strokeWidth="0.8" />
        );
      }
    }
  }

  return (
    <svg className="log-svg" viewBox="0 0 1080 585" role="img" aria-label={`Daily log for ${day.date}`}>
      {/* paper */}
      <rect x="0" y="0" width="1080" height="585" rx="10" fill={PAPER} />
      <rect x="0.75" y="0.75" width="1078.5" height="583.5" rx="10" fill="none" stroke="#d3dae4" strokeWidth="1.5" />

      {/* ---------- header ---------- */}
      <text x="540" y="34" textAnchor="middle" fill={INK} fontSize="19" fontWeight="700" fontFamily="Sora, sans-serif">
        DRIVER&apos;S DAILY LOG
      </text>
      <text x="540" y="50" textAnchor="middle" fill={INK_SOFT} fontSize="10">
        (ONE CALENDAR DAY — 24 HOURS) · U.S. DEPARTMENT OF TRANSPORTATION
      </text>

      {/* date boxes */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="15" fill={INK}>
        <text x="60" y="86">{month}</text>
        <text x="106" y="86">{dayNum}</text>
        <text x="152" y="86">{year}</text>
      </g>
      <g stroke={INK_SOFT} strokeWidth="1">
        <line x1="48" y1="92" x2="88" y2="92" />
        <line x1="96" y1="92" x2="136" y2="92" />
        <line x1="144" y1="92" x2="200" y2="92" />
      </g>
      <g fontSize="8.5" fill={INK_SOFT}>
        <text x="55" y="102">(MONTH)</text>
        <text x="105" y="102">(DAY)</text>
        <text x="160" y="102">(YEAR)</text>
      </g>

      {/* from / to */}
      <g fontSize="11" fill={INK}>
        <text x="240" y="86">
          <tspan fill={INK_SOFT} fontSize="9.5">FROM: </tspan>
          {inputs.current_location.slice(0, 34)}
        </text>
        <text x="240" y="104">
          <tspan fill={INK_SOFT} fontSize="9.5">TO: </tspan>
          {inputs.dropoff_location.slice(0, 34)}
        </text>
      </g>

      {/* miles + carrier */}
      <rect x="560" y="66" width="130" height="40" fill="none" stroke={INK_SOFT} strokeWidth="1" rx="4" />
      <text x="625" y="86" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="16" fill={INK}>
        {Math.round(day.miles).toLocaleString()}
      </text>
      <text x="625" y="99" textAnchor="middle" fontSize="8" fill={INK_SOFT}>
        TOTAL MILES DRIVING TODAY
      </text>

      <g fontSize="11" fill={INK}>
        <text x="730" y="80">RouteLedger Freight Lines</text>
        <text x="730" y="93" fontSize="8.5" fill={INK_SOFT}>(NAME OF CARRIER)</text>
        <text x="920" y="80">Truck #101</text>
        <text x="920" y="93" fontSize="8.5" fill={INK_SOFT}>(VEHICLE NO.)</text>
        <text x="730" y="114">Day {day.day_index} of trip</text>
        <text x="920" y="114" fontSize="10" fill={INK_SOFT}>Home terminal time</text>
      </g>

      {/* ---------- hour labels ---------- */}
      <g fontSize="9.5" fill={INK_SOFT} fontFamily="JetBrains Mono, monospace">
        {Array.from({ length: 25 }, (_, hour) => (
          <text key={hour} x={xAt(hour)} y={Y0 - 8} textAnchor="middle">
            {hourLabel(hour)}
          </text>
        ))}
        <text x={X_TOTALS + 26} y={Y0 - 8} textAnchor="middle" fontSize="8.5">TOTAL</text>
      </g>

      {/* ---------- grid ---------- */}
      <rect x={X0} y={Y0} width={GRID_W} height={GRID_H} fill="#ffffff" stroke={INK} strokeWidth="1.4" />
      {Array.from({ length: 23 }, (_, i) => (
        <line key={i} x1={xAt(i + 1)} y1={Y0} x2={xAt(i + 1)} y2={Y0 + GRID_H} stroke={GRID_LINE} strokeWidth="1" />
      ))}
      {ticks}
      {[1, 2, 3].map((row) => (
        <line key={row} x1={X0} y1={Y0 + row * ROW_H} x2={X0 + GRID_W} y2={Y0 + row * ROW_H} stroke={INK} strokeWidth="1" />
      ))}

      {/* row labels + totals */}
      {ROWS.map((status, index) => (
        <g key={status}>
          <text x={X0 - 10} y={Y0 + index * ROW_H + ROW_H / 2 + 4} textAnchor="end" fontSize="10.5" fill={INK} fontWeight="600">
            {ROW_LABELS[index]}
          </text>
          <text
            x={X_TOTALS + 26}
            y={Y0 + index * ROW_H + ROW_H / 2 + 5}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="13"
            fill={STATUS_META[status].paper}
            fontWeight="700"
          >
            {day.totals[status].toFixed(2)}
          </text>
        </g>
      ))}
      <line x1={X_TOTALS + 4} y1={Y0 + GRID_H + 6} x2={X_TOTALS + 48} y2={Y0 + GRID_H + 6} stroke={INK} strokeWidth="1" />
      <text x={X_TOTALS + 26} y={Y0 + GRID_H + 22} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12.5" fill={INK} fontWeight="700">
        ={totalHours.toFixed(2)}
      </text>

      {/* ---------- duty line ---------- */}
      <DutyLine segments={day.segments} />

      {/* ---------- remarks ---------- */}
      <text x={X0 - 10} y={Y0 + GRID_H + 34} textAnchor="end" fontSize="10.5" fontWeight="600" fill={INK}>
        REMARKS
      </text>
      <line x1={X0} y1={Y0 + GRID_H + 24} x2={X0 + GRID_W} y2={Y0 + GRID_H + 24} stroke={INK_SOFT} strokeWidth="0.8" />
      <g fontSize="9" fill={INK_SOFT}>
        {day.remarks.slice(0, 14).map((remark, index) => {
          const x = xAt(remark.hour);
          const y = Y0 + GRID_H + 36;
          return (
            <g key={index} transform={`rotate(38 ${x} ${y})`}>
              <text x={x} y={y}>
                {remark.label.slice(0, 24)} · mi {Math.round(remark.odometer).toLocaleString()}
              </text>
            </g>
          );
        })}
      </g>

      {/* ---------- footer recap ---------- */}
      <g fontSize="10" fill={INK_SOFT}>
        <text x="48" y="560">Shipping Doc: PRO #{String(day.day_index).padStart(4, "0")}-RL · Commodity: General freight</text>
        <text x="640" y="560">
          70hr/8day recap — cycle used after today:{" "}
          <tspan fill={INK} fontWeight="700" fontFamily="JetBrains Mono, monospace">
            {day.cycle_used_after != null ? `${day.cycle_used_after}h` : "see final sheet"}
          </tspan>
        </text>
      </g>
    </svg>
  );
}
