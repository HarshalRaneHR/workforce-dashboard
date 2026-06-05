import SearchBar from "./SearchBar";
import DepartmentFilters from "./DepartmentFilters";
import type { ToolbarProps } from "../types";
import "./css/Toolbar.css";

const Toolbar = ({
  query,
  onQueryChange,
  departments,
  activeDepts,
  activeOnly,
  onToggleDept,
  onToggleActiveOnly,
  visibleCount,
  totalCount,
}: ToolbarProps) => {
  return (
    <div className="toolbar">
      <SearchBar value={query} onChange={onQueryChange} />
      <DepartmentFilters
        departments={departments}
        active={activeDepts}
        activeOnly={activeOnly}
        onToggleDept={onToggleDept}
        onToggleActiveOnly={onToggleActiveOnly}
      />
      <div className="count-badge">
        <strong>{visibleCount}</strong>
        <span>of {totalCount}</span>
      </div>
    </div>
  );
};

export default Toolbar;
