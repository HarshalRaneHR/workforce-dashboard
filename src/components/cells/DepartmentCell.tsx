import type { ICellRendererParams } from "ag-grid-community";
import type { Employee, Department } from "../../types";
import "./css/DepartmentCell.css";

const DepartmentCell = (p: ICellRendererParams<Employee>) => {
  const dept = p.value as Department;
  if (!dept) return null;
  return (
    <span className="dept-pill" data-dept={dept}>
      <i className="dept-dot" />
      {dept}
    </span>
  );
};

export default DepartmentCell;
