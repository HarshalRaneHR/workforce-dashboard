import Dashboard from "./components/Dashboard";
import Loader from "./components/Loader";
import { useEmployees } from "./hooks/useEmployees";

const App = () => {
  const { employees, loading, error } = useEmployees();

  if (loading || error) return <Loader error={error} />;

  return <Dashboard employees={employees} />;
};

export default App;
