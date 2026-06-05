import type { ICellRendererParams } from "ag-grid-community";
import type { Employee } from "../../types";
import "./css/TenureCell.css";

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

const TenureCell = (p: ICellRendererParams<Employee>) => {
  const raw = p.value as string;
  const hired = new Date(raw);
  const years = (Date.now() - hired.getTime()) / MS_PER_YEAR;
  const label = years >= 1 ? `${years.toFixed(1)} yrs` : "<1 yr";
  const fmt = hired.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="tenure">
      <span className="tenure-years">{label}</span>
      <span className="tenure-date">{fmt}</span>
    </div>
  );
};

export default TenureCell;
