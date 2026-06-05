export type Department =
  | "Engineering"
  | "Marketing"
  | "Sales"
  | "HR"
  | "Finance";

/* Ordered list of departments. Per-department colours live in styles.css
   as CSS variables, bound via the [data-dept="…"] attribute. */
export const DEPARTMENTS: Department[] = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
];

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  position: string;
  salary: number;
  hireDate: string;
  age: number;
  location: string;
  performanceRating: number;
  projectsCompleted: number;
  isActive: boolean;
  skills: string[];
  manager: string | null;
}

export interface UseEmployeesResult {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export interface Stat {
  key: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  hint: string;
  spark: number[];
}

export interface DashboardProps {
  employees: Employee[];
}

export interface LoaderProps {
  error?: string | null;
}

export interface StatCardsProps {
  stats: Stat[];
  active?: boolean;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export interface DepartmentFiltersProps {
  departments: Department[];
  active: Set<Department>;
  activeOnly: boolean;
  onToggleDept: (department: Department) => void;
  onToggleActiveOnly: () => void;
}

export interface ToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  departments: Department[];
  activeDepts: Set<Department>;
  activeOnly: boolean;
  onToggleDept: (department: Department) => void;
  onToggleActiveOnly: () => void;
  visibleCount: number;
  totalCount: number;
}

export interface EmployeeGridProps {
  rows: Employee[];
  quickFilterText: string;
}
