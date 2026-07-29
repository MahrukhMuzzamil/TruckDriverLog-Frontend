import Icon from "./Icon.jsx";

export default function Header({ onTour }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-mark">
            <Icon name="truck" size={22} strokeWidth={1.6} />
          </div>
          <div>
            <div className="brand-name">RouteLedger</div>
            <div className="brand-sub">ELD Trip Planner</div>
          </div>
        </div>
        <button className="btn btn-ghost" onClick={onTour} data-tour="tour-btn">
          Take the tour
        </button>
      </div>
    </header>
  );
}
