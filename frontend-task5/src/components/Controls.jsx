import React from "react";
import { FaShuffle } from "react-icons/fa6";
import { localeOptions } from "../utils/localeOptions";

const Controls = ({
  region,
  seed,
  likes,
  reviews,
  onChange,
  onRandomizeSeed,
}) => {
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between">
        {/* Region Select */}
        <div className="col-auto">
          <label className="form-label">Region:</label>
          <select
            className="form-select"
            value={region}
            onChange={(e) => onChange("region", e.target.value)}
          >
            {localeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Seed Input */}
        <div className="col-auto">
          <label className="form-label">Seed:</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={seed}
              onChange={(e) => onChange("seed", e.target.value)}
            />
            <button
              className="btn btn-outline-secondary d-flex align-items-center"
              onClick={onRandomizeSeed}
            >
              <FaShuffle />
            </button>
          </div>
        </div>

        {/* Likes Range */}
        <div className="col-auto">
          <label className="form-label">Avg Likes: {likes}</label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="10"
            step="0.1"
            value={likes}
            onChange={(e) => onChange("likes", parseFloat(e.target.value))}
          />
        </div>

        {/* Reviews Input */}
        <div className="col-auto">
          <label className="form-label">Avg Reviews:</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            className="form-control"
            value={reviews}
            onChange={(e) => onChange("reviews", parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
