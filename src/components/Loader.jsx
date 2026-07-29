import { useEffect, useState } from "react";

const MESSAGES = [
  "Geocoding your locations…",
  "Finding the best truck route…",
  "Scheduling breaks & 10-hr rests…",
  "Placing fuel stops every 1,000 miles…",
  "Drawing your daily log sheets…",
];

export default function Loader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 1400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loader-overlay">
      <div className="card loader-card">
        <span className="truck-emoji">🚛</span>
        <div className="road" />
        <div className="msg">{MESSAGES[index]}</div>
      </div>
    </div>
  );
}
