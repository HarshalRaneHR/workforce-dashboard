import { useCallback, useMemo, useState } from "react";
import { motion } from "motion/react";

import Atmosphere from "./Atmosphere";
import Masthead from "./Masthead";
import StatCards from "./StatCards";
import Toolbar from "./Toolbar";
import EmployeeGrid from "./EmployeeGrid";
import { useEmployeeStats } from "../hooks/useEmployeeStats";
import { reveal } from "../lib/animations";
import { DEPARTMENTS, type Department, type DashboardProps } from "../types";

const Dashboard = ({ employees }: DashboardProps) => {
  const [query, setQuery] = useState("");
  const [activeDepts, setActiveDepts] = useState<Set<Department>>(new Set());
  const [activeOnly, setActiveOnly] = useState(false);

  const stats = useEmployeeStats(employees);

  const rows = useMemo(
    () =>
      employees.filter((e) => {
        if (activeOnly && !e.isActive) return false;
        if (activeDepts.size && !activeDepts.has(e.department)) return false;
        return true;
      }),
    [employees, activeDepts, activeOnly]
  );

  const toggleDept = useCallback(
    (d: Department) =>
      setActiveDepts((prev) => {
        const next = new Set(prev);
        next.has(d) ? next.delete(d) : next.add(d);
        return next;
      }),
    []
  );

  const toggleActiveOnly = useCallback(() => setActiveOnly((v) => !v), []);

  return (
    <div className="app live">
      <Atmosphere />
      <div className="impact-burst" aria-hidden />

      <Masthead />

      <StatCards stats={stats} active />

      <motion.section className="panel" {...reveal(28, 0.65)}>
        <Toolbar
          query={query}
          onQueryChange={setQuery}
          departments={DEPARTMENTS}
          activeDepts={activeDepts}
          activeOnly={activeOnly}
          onToggleDept={toggleDept}
          onToggleActiveOnly={toggleActiveOnly}
          visibleCount={rows.length}
          totalCount={employees.length}
        />
        <EmployeeGrid rows={rows} quickFilterText={query} />
      </motion.section>
    </div>
  );
};

export default Dashboard;
