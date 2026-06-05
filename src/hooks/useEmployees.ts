import { useEffect, useState } from "react";
import type { Employee, UseEmployeesResult } from "../types";

/* To Display Loader */
const MIN_LOADER_MS = 1000;

export function useEmployees(): UseEmployeesResult {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const wait = new Promise((r) => setTimeout(r, MIN_LOADER_MS));

    (async () => {
      try {
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Employee[];
        await wait; // keep the loader visible for a beat
        if (!cancelled) setEmployees(data);
      } catch (err) {
        await wait;
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { employees, loading, error };
}
