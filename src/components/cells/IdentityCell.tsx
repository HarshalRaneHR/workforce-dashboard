import type { ICellRendererParams } from "ag-grid-community";
import type { Employee } from "../../types";
import "./css/IdentityCell.css";

/** Avatar (initials, dept-tinted) + name + position. */
const IdentityCell = (p: ICellRendererParams<Employee>) => {
  const e = p.data;
  if (!e) return null;
  const initials = (e.firstName[0] + e.lastName[0]).toUpperCase();
  return (
    <div className="cell-identity">
      <span className="avatar" data-dept={e.department}>
        {initials}
        <i className={`avatar-dot ${e.isActive ? "on" : "off"}`} />
      </span>
      <span className="identity-text">
        <span className="identity-name">
          {e.firstName} {e.lastName}
        </span>
        <span className="identity-role">{e.position}</span>
      </span>
    </div>
  );
};

export default IdentityCell;
