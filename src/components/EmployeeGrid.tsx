import { useMemo } from "react";
import { motion } from "motion/react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ValueGetterParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./css/EmployeeGrid.css";

import {
  DepartmentCell,
  IdentityCell,
  LocationCell,
  PerformanceCell,
  ProjectsCell,
  SalaryCell,
  SkillsCell,
  SkillsTooltip,
  StatusCell,
  TenureCell,
} from "./cells";
import type { Employee, EmployeeGridProps } from "../types";

const EmployeeGrid = ({ rows, quickFilterText }: EmployeeGridProps) => {
  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      {
        headerName: "Employee",
        colId: "name",
        pinned: "left",
        minWidth: 248,
        flex: 1.4,
        cellRenderer: IdentityCell,
        valueGetter: (p: ValueGetterParams<Employee>) =>
          p.data ? `${p.data.firstName} ${p.data.lastName}` : "",
        sort: "asc",
      },
      {
        headerName: "Division",
        field: "department",
        minWidth: 150,
        cellRenderer: DepartmentCell,
      },
      {
        headerName: "Location",
        field: "location",
        minWidth: 140,
        cellRenderer: LocationCell,
      },
      {
        headerName: "Performance",
        field: "performanceRating",
        minWidth: 168,
        cellRenderer: PerformanceCell,
        sort: undefined,
      },
      {
        headerName: "Salary",
        field: "salary",
        minWidth: 150,
        cellRenderer: SalaryCell,
      },
      {
        headerName: "Projects",
        field: "projectsCompleted",
        minWidth: 138,
        cellRenderer: ProjectsCell,
      },
      {
        headerName: "Age",
        field: "age",
        minWidth: 84,
        cellClass: "num-cell",
      },
      {
        headerName: "Tenure",
        field: "hireDate",
        minWidth: 132,
        cellRenderer: TenureCell,
      },
      {
        headerName: "Skills",
        field: "skills",
        minWidth: 268,
        flex: 1.7,
        sortable: false,
        cellRenderer: SkillsCell,
        tooltipComponent: SkillsTooltip,
        tooltipValueGetter: (p) => (p.data?.skills ?? []).join(", "),
        filterValueGetter: (p) => (p.data?.skills ?? []).join(" "),
      },
      {
        headerName: "Reports To",
        field: "manager",
        minWidth: 150,
        valueFormatter: (p) => p.value ?? "—",
        cellClass: (p) => (p.value ? "mgr-cell" : "mgr-cell muted"),
      },
      {
        headerName: "Status",
        field: "isActive",
        minWidth: 130,
        cellRenderer: StatusCell,
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      suppressHeaderMenuButton: false,
    }),
    []
  );

  return (
    <motion.div
      className="grid-shell ag-theme-quartz"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid-spotlight" aria-hidden />
      <AgGridReact<Employee>
        rowData={rows}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        quickFilterText={quickFilterText}
        rowHeight={72}
        headerHeight={50}
        animateRows
        suppressCellFocus
        domLayout="autoHeight"
        pagination
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20]}
        getRowId={(p) => String(p.data.id)}
        tooltipShowDelay={200}
      />
    </motion.div>
  );
};

export default EmployeeGrid;
