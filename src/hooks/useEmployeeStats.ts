import { useMemo } from "react";
import { DEPARTMENTS, type Employee, type Stat } from "../types";

/**
 * Derives the four headline KPI cards from the employee set — headcount,
 * average performance, annual payroll, and projects shipped — each with a
 * sparkline series. Memoised on the employee list.
 */
export function useEmployeeStats(employees: Employee[]): Stat[] {
  return useMemo<Stat[]>(() => {
    const n = employees.length;
    const active = employees.filter((e) => e.isActive).length;
    const payroll = employees.reduce((s, e) => s + e.salary, 0);
    const avgPerf = employees.reduce((s, e) => s + e.performanceRating, 0) / n;
    const projects = employees.reduce((s, e) => s + e.projectsCompleted, 0);

    const salariesSorted = [...employees]
      .sort((a, b) => a.salary - b.salary)
      .map((e) => e.salary);
    const perfSorted = [...employees]
      .sort((a, b) => a.performanceRating - b.performanceRating)
      .map((e) => e.performanceRating);
    const projSorted = [...employees]
      .sort((a, b) => a.projectsCompleted - b.projectsCompleted)
      .map((e) => e.projectsCompleted);

    // hires per calendar year — a real trend line
    const byYear: Record<string, number> = {};
    for (const e of employees) {
      const y = e.hireDate.slice(0, 4);
      byYear[y] = (byYear[y] ?? 0) + 1;
    }
    const hireTrend = Object.keys(byYear)
      .sort()
      .reduce<number[]>((acc, y) => {
        acc.push((acc.length ? acc[acc.length - 1] : 0) + byYear[y]);
        return acc;
      }, []);

    return [
      {
        key: "headcount",
        label: "Headcount",
        value: n,
        hint: `${active} active · ${DEPARTMENTS.length} divisions`,
        spark: hireTrend,
      },
      {
        key: "perf",
        label: "Avg. Performance",
        value: avgPerf,
        decimals: 2,
        suffix: " / 5",
        hint: "Rolling rating across all staff",
        spark: perfSorted,
      },
      {
        key: "payroll",
        label: "Annual Payroll",
        value: payroll / 1_000_000,
        prefix: "$",
        decimals: 2,
        suffix: "M",
        hint: "Total committed compensation",
        spark: salariesSorted,
      },
      {
        key: "projects",
        label: "Projects Shipped",
        value: projects,
        hint: "Lifetime delivery across teams",
        spark: projSorted,
      },
    ];
  }, [employees]);
}
