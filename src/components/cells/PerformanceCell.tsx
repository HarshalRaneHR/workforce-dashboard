import type { ICellRendererParams } from "ag-grid-community";
import { FaStar } from "react-icons/fa";
import type { Employee } from "../../types";
import "./css/PerformanceCell.css";

const STARS = 5;

/** Performance rating rendered as 5 stars, gold-filled to the score. */
const PerformanceCell = (p: ICellRendererParams<Employee>) => {
  const v = Number(p.value) || 0;
  const pct = Math.max(0, Math.min(100, (v / STARS) * 100));
  const tier = v >= 4.5 ? "elite" : v >= 4.0 ? "strong" : "steady";
  return (
    <div className="perf" data-tier={tier} title={`${v.toFixed(1)} / 5`}>
      <span className="stars">
        <span className="stars-row">
          {Array.from({ length: STARS }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </span>
        <span className="stars-fill" style={{ width: `${pct}%` }}>
          <span className="stars-row">
            {Array.from({ length: STARS }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </span>
        </span>
      </span>
      <span className="perf-val">{v.toFixed(1)}</span>
    </div>
  );
};

export default PerformanceCell;
