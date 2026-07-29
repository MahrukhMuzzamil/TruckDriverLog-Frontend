import { useEffect, useRef, useState } from "react";

import { suggestLocations } from "../api";

/** Text input with debounced, keyboard-navigable location autocomplete. */
export default function LocationInput({ id, label, icon, placeholder, value, onChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const debounceRef = useRef(null);
  const skipNextFetch = useRef(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    if (value.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await suggestLocations(value);
        setSuggestions(results);
        setOpen(results.length > 0);
        setActive(-1);
      } catch {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [value]);

  useEffect(() => {
    function onClickOutside(event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function pick(suggestion) {
    skipNextFetch.current = true;
    onChange(suggestion.name);
    setOpen(false);
  }

  function onKeyDown(event) {
    if (!open || !suggestions.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((a) => (a + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((a) => (a - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      pick(suggestions[active]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="field" ref={wrapRef}>
      <label htmlFor={id}>
        <span>{icon}</span> {label}
      </label>
      <div className="field-input">
        <input
          id={id}
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => suggestions.length && setOpen(true)}
        />
        {open && (
          <div className="suggestions" role="listbox">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.lat}-${suggestion.lon}`}
                type="button"
                className={index === active ? "active" : ""}
                onClick={() => pick(suggestion)}
              >
                📍 {suggestion.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
