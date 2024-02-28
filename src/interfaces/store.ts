import { ColumnDef } from "@tanstack/react-table";

export interface ExpenseType {
  id: number;
  merchant: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: string;
}

export interface ExpenseStore {
  expenses: ExpenseType[];
  getExpenses: () => Promise<void>;
  columns: ColumnDef<ExpenseType>[];
}
