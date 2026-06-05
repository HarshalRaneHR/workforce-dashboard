import type { ICellRendererParams } from "ag-grid-community";
import type { Employee } from "../../types";
import "./css/SalaryCell.css";

/** Salary as a clean formatted figure ($95,000). */
const SalaryCell = (p: ICellRendererParams<Employee>) => {
  const v = Number(p.value) || 0;
  return (
    <span className="salary">
      <span className="salary-cur">$</span>
      {v.toLocaleString("en-US")}
    </span>
  );
};

export default SalaryCell;
