import type { ICellRendererParams } from "ag-grid-community";
import { FiCheckCircle } from "react-icons/fi";
import type { Employee } from "../../types";
import "./css/ProjectsCell.css";

/** Projects completed: icon + count. */
const ProjectsCell = (p: ICellRendererParams<Employee>) => {
  const v = Number(p.value) || 0;
  return (
    <span className="projects" title={`${v} projects completed`}>
      <FiCheckCircle className="projects-icon" size={15} aria-hidden />
      <span className="projects-num">{v}</span>
    </span>
  );
};

export default ProjectsCell;
