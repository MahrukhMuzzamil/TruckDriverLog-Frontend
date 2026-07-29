/** Minimal inline SVG icon set (stroke-based, inherits currentColor). */

const PATHS = {
  truck: (
    <>
      <path d="M1.5 6.5h12v10h-12z" />
      <path d="M13.5 10h3.6l2.9 3v3.5h-6.5" />
      <circle cx="6" cy="18.5" r="1.8" />
      <circle cx="16.5" cy="18.5" r="1.8" />
    </>
  ),
  road: (
    <>
      <path d="M5 20L9.5 4" />
      <path d="M19 20L14.5 4" />
      <path d="M12 5.5v2.2M12 11v2.2M12 16.5v2.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M16 3v4M8 3v4M3.5 10.5h17" />
    </>
  ),
  fuel: (
    <>
      <path d="M14 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
      <path d="M3 21h13M5 9h9" />
      <path d="M14 12h1.5a2 2 0 0 1 2 2v3a1.5 1.5 0 0 0 3 0V9.5L17.5 6" />
    </>
  ),
  moon: <path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a7 7 0 0 0 9.7 9.7z" />,
  coffee: (
    <>
      <path d="M17 9h1a3.5 3.5 0 0 1 0 7h-1" />
      <path d="M3.5 9H17v6a4 4 0 0 1-4 4H7.5a4 4 0 0 1-4-4V9z" />
      <path d="M7 3.5v2M10.5 3.5v2M14 3.5v2" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 1 1-2.6-6.4" />
      <path d="M21 3v6h-6" />
    </>
  ),
  battery: (
    <>
      <rect x="2" y="7.5" width="17" height="9" rx="2" />
      <path d="M22 10.5v3" />
      <path d="M6 10.5v3M9.5 10.5v3M13 10.5v3" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5S5 16.2 5 10.3a7 7 0 0 1 14 0c0 5.9-7 11.2-7 11.2z" />
      <circle cx="12" cy="10.3" r="2.5" />
    </>
  ),
  package: (
    <>
      <path d="M21 8l-9-5-9 5v8.5l9 5 9-5V8z" />
      <path d="M3 8l9 5 9-5M12 21.5V13" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  printer: (
    <>
      <path d="M6.5 8.5V3.5h11v5" />
      <rect x="3" y="8.5" width="18" height="9" rx="2" />
      <path d="M6.5 14.5h11v6h-11z" />
    </>
  ),
  flag: (
    <>
      <path d="M5.5 21.5v-18" />
      <path d="M5.5 4h12.5l-2.5 4.5 2.5 4.5H5.5" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  sheet: (
    <>
      <path d="M6 2.5h9l4 4v15H6z" />
      <path d="M15 2.5v4h4M9 12h7M9 15.5h7M9 8.5h3" />
    </>
  ),
};

export default function Icon({ name, size = 18, strokeWidth = 1.8, className = "" }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
