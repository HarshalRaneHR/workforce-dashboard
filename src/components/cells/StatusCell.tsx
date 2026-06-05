import type { ICellRendererParams } from "ag-grid-community";
import type { Employee } from "../../types";
import "./css/StatusCell.css";

/** Active / inactive status with a pulsing dot. */
const StatusCell = (p: ICellRendererParams<Employee>) => {
  const active = Boolean(p.value);
  return (
    <span className={`status ${active ? "active" : "inactive"}`}>
      <i className="status-pulse" />
      {active ? "Active" : "Inactive"}
    </span>
  );
};

export default StatusCell;
