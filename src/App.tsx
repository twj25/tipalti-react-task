import { useEffect } from "react";
import ExpenseTable from "./components/ExpenseTable";
import { useExpenseStore } from "./store";

function App() {
  const getExpenses = useExpenseStore((state) => state.getExpenses);
  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="py-10 flex flex-col items-center gap-8 w-screen h-screen">
      <h1 className="font-bold font-size text-3xl">Expenses</h1>
      <ExpenseTable />
    </div>
  );
}

export default App;
