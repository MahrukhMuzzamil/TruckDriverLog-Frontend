import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { extractErrorMessage, planTrip } from "./api";
import Header from "./components/Header.jsx";
import Itinerary from "./components/Itinerary.jsx";
import Loader from "./components/Loader.jsx";
import LogBook from "./components/LogBook.jsx";
import MapView from "./components/MapView.jsx";
import StatsBar from "./components/StatsBar.jsx";
import TripForm from "./components/TripForm.jsx";
import { maybeStartIntroTour, maybeStartResultsTour, startTour } from "./tour";

export default function App() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const resultsRef = useRef(null);

  useEffect(() => {
    maybeStartIntroTour();
  }, []);

  async function handlePlan(payload) {
    setLoading(true);
    setError("");
    try {
      const created = await planTrip(payload);
      setTrip(created);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        maybeStartResultsTour();
      }, 250);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  const result = trip?.result;

  return (
    <>
      <Header onTour={startTour} />

      <main>
        <section className="hero-band">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className="hero-eyebrow">FMCSA 70hr / 8day &middot; Property Carrier</span>
              <h1>
                Route smart. <span className="glow">Log automatically.</span>
              </h1>
              <p>
                Enter a trip and get the full picture in seconds — the route with every
                mandatory rest, break and fuel stop, plus your daily ELD log sheets drawn
                and totaled for you.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container">
          <TripForm onSubmit={handlePlan} loading={loading} error={error} />
        </div>

        <AnimatePresence>
          {result && (
            <motion.section
              key={trip.id}
              ref={resultsRef}
              className="results container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StatsBar summary={result.summary} />

              <div className="results-grid">
                <MapView route={result.route} stops={result.stops} />
                <Itinerary schedule={result.schedule} />
              </div>

              <LogBook logs={result.logs} result={result} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="footer">
        <div className="container">
          RouteLedger — ELD trip planner &middot; Routing by{" "}
          <a href="https://project-osrm.org" target="_blank" rel="noreferrer">OSRM</a> &middot; Geocoding by{" "}
          <a href="https://nominatim.org" target="_blank" rel="noreferrer">Nominatim</a> &middot; Map data ©{" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>
        </div>
      </footer>

      {loading && <Loader />}
    </>
  );
}
