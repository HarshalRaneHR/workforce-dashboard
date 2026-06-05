import type { DepartmentFiltersProps } from "../types";
import "./css/DepartmentFilters.css";

const DepartmentFilters = ({
  departments,
  active,
  activeOnly,
  onToggleDept,
  onToggleActiveOnly,
}: DepartmentFiltersProps) => {
  return (
    <div className="dept-filters">
      {departments.map((d) => {
        const on = active.has(d);
        return (
          <button
            key={d}
            className={`filter-chip ${on ? "on" : ""}`}
            data-dept={d}
            onClick={() => onToggleDept(d)}
            aria-pressed={on}
          >
            <i className="chip-dot" />
            {d}
          </button>
        );
      })}
      <button
        className={`filter-chip toggle ${activeOnly ? "on" : ""}`}
        onClick={onToggleActiveOnly}
        aria-pressed={activeOnly}
      >
        Active only
      </button>
    </div>
  );
};

export default DepartmentFilters;
