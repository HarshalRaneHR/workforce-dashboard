import type { ICellRendererParams } from "ag-grid-community";
import { FiMapPin } from "react-icons/fi";
import type { Employee } from "../../types";
import "./css/LocationCell.css";

/** Location with a pin icon. */
const LocationCell = (p: ICellRendererParams<Employee>) => {
  return (
    <span className="loc">
      <FiMapPin size={13} aria-hidden />
      {p.value}
    </span>
  );
};

export default LocationCell;
