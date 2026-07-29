import { motion } from "framer-motion";
import { useState } from "react";

import LocationInput from "./LocationInput.jsx";

export default function TripForm({ onSubmit, loading, error }) {
  const [current, setCurrent] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [cycleUsed, setCycleUsed] = useState(0);

  const ready = current.trim() && pickup.trim() && dropoff.trim();

  function handleSubmit(event) {
    event.preventDefault();
    if (!ready || loading) return;
    onSubmit({
      current_location: current.trim(),
      pickup_location: pickup.trim(),
      dropoff_location: dropoff.trim(),
      current_cycle_used: Number(cycleUsed),
    });
  }

  return (
    <motion.form
      className="card trip-form-wrap"
      data-tour="form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 }}
    >
      <div className="form-grid">
        <div className="full">
          <LocationInput
            id="current"
            label="Current location"
            icon="🧭"
            placeholder="e.g. Chicago, IL"
            value={current}
            onChange={setCurrent}
          />
        </div>
        <LocationInput
          id="pickup"
          label="Pickup location"
          icon="📦"
          placeholder="e.g. Indianapolis, IN"
          value={pickup}
          onChange={setPickup}
        />
        <LocationInput
          id="dropoff"
          label="Drop-off location"
          icon="🎯"
          placeholder="e.g. Denver, CO"
          value={dropoff}
          onChange={setDropoff}
        />
        <div className="full field" data-tour="cycle">
          <label htmlFor="cycle">⏱️ Current cycle used — hours on duty in the last 8 days</label>
          <div className="cycle-row">
            <input
              id="cycle"
              type="range"
              min="0"
              max="70"
              step="0.5"
              value={cycleUsed}
              onChange={(event) => setCycleUsed(event.target.value)}
            />
            <div className="cycle-value">{Number(cycleUsed).toFixed(1)} / 70h</div>
          </div>
        </div>
        <div className="full" style={{ textAlign: "center", marginTop: 4 }}>
          <button
            className="btn btn-primary btn-lg"
            type="submit"
            data-tour="plan-btn"
            disabled={!ready || loading}
          >
            {loading ? "Planning…" : "Plan my trip →"}
          </button>
        </div>
      </div>

      {error && <div className="form-error">⚠️ {error}</div>}
    </motion.form>
  );
}
