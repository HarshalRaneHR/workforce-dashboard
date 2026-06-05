import type { ICellRendererParams } from "ag-grid-community";
import type { Employee } from "../../types";
import "./css/SkillsTooltip.css";

/** Full skill set, revealed in a styled tooltip on hover. */
const SkillsTooltip = (p: ICellRendererParams<Employee>) => {
  const e = p.data;
  if (!e) return null;
  return (
    <div className="skill-tip" data-dept={e.department}>
      <div className="skill-tip-head">
        <span className="skill-tip-name">
          {e.firstName} {e.lastName}
        </span>
        <span className="skill-tip-role">{e.position}</span>
      </div>
      <div className="skill-tip-body">
        {e.skills.map((s) => (
          <span key={s} className="skill-chip">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsTooltip;
