import { driver } from "driver.js";

const STEPS = [
  {
    element: "[data-tour='form']",
    popover: {
      title: "Plan a trip 🚛",
      description:
        "Enter where you are now, where you'll pick up the load, and where it's headed. Start typing and pick a suggestion.",
      side: "bottom",
    },
  },
  {
    element: "[data-tour='cycle']",
    popover: {
      title: "Your 70-hour cycle",
      description:
        "Slide to the number of on-duty hours you've already used in the last 8 days. The planner budgets the rest of your cycle around it.",
      side: "top",
    },
  },
  {
    element: "[data-tour='plan-btn']",
    popover: {
      title: "Generate the plan",
      description:
        "One click computes the route, every mandatory break and rest, fuel stops, and your completed daily log sheets.",
      side: "top",
    },
  },
  {
    element: "[data-tour='stats']",
    popover: {
      title: "Trip at a glance",
      description: "Distance, driving hours, days on the road, and every stop the rules require.",
      side: "bottom",
    },
  },
  {
    element: "[data-tour='map']",
    popover: {
      title: "Route & stops",
      description:
        "The full route with markers for pickup, drop-off, fuel stops, 30-minute breaks and 10-hour rests. Click any marker for details.",
      side: "top",
    },
  },
  {
    element: "[data-tour='itinerary']",
    popover: {
      title: "Hour-by-hour itinerary",
      description: "Chronological duty timeline — exactly what an ELD would record.",
      side: "left",
    },
  },
  {
    element: "[data-tour='logbook']",
    popover: {
      title: "Daily log sheets 📋",
      description:
        "FMCSA-style driver's daily logs, drawn automatically — one sheet per day, with duty lines, totals and remarks. Print-ready.",
      side: "top",
    },
  },
];

function makeDriver(steps) {
  return driver({
    showProgress: true,
    popoverClass: "rl-tour",
    nextBtnText: "Next →",
    prevBtnText: "← Back",
    doneBtnText: "Done",
    steps,
  });
}

function availableSteps() {
  return STEPS.filter((step) => document.querySelector(step.element));
}

export function startTour() {
  const steps = availableSteps();
  if (steps.length) makeDriver(steps).drive();
}

const INTRO_KEY = "rl_tour_intro_seen";
const RESULTS_KEY = "rl_tour_results_seen";

export function maybeStartIntroTour() {
  if (localStorage.getItem(INTRO_KEY)) return;
  localStorage.setItem(INTRO_KEY, "1");
  setTimeout(startTour, 700);
}

export function maybeStartResultsTour() {
  if (localStorage.getItem(RESULTS_KEY)) return;
  localStorage.setItem(RESULTS_KEY, "1");
  const resultSteps = availableSteps().filter((step) =>
    ["stats", "map", "itinerary", "logbook"].some((k) => step.element.includes(k))
  );
  if (resultSteps.length) setTimeout(() => makeDriver(resultSteps).drive(), 900);
}
