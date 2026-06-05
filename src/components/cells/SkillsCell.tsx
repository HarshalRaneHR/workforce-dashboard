import type { ICellRendererParams } from "ag-grid-community";
import type { Employee } from "../../types";
import "./css/SkillsCell.css";

const SKILLS_VISIBLE = 2;

/** First few skills as chips, with a +N overflow pill. */
const SkillsCell = (p: ICellRendererParams<Employee>) => {
  const skills = (p.value as string[]) ?? [];
  const shown = skills.slice(0, SKILLS_VISIBLE);
  const extra = skills.length - shown.length;
  return (
    <div className="skills">
      {shown.map((s) => (
        <span key={s} className="skill-chip" title={s}>
          {s}
        </span>
      ))}
      {extra > 0 && <span className="skill-chip more">+{extra}</span>}
    </div>
  );
};

export default SkillsCell;
