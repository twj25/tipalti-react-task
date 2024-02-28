import { create } from "zustand";
import { ExpenseStore } from "../interfaces/store";
import { getExpenses } from "../api/backend";

/*
    State Management Store

We are storing the expenses and columns in the store.
There is a function to fetch the expenses from the backend.
In the future we could add more functions to update the expenses, delete expenses, etc.

Additionally we could add function to update the columns, add columns, delete columns, etc.

*/

export const useExpenseStore = create<ExpenseStore>()((set) => ({
  expenses: [],
  getExpenses: async () => {
    const res = await getExpenses();
    set({ expenses: res });
  },
  columns: [
    {
      id: "id",
      accessorKey: "id",
      header: "ID",
    },
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
    },
    {
      id: "merchant",
      accessorKey: "merchant",
      header: "Merchant",
    },
    {
      id: "amount",
      accessorKey: "amount",
      header: "Amount",
    },
    {
      id: "category",
      accessorKey: "category",
      header: "Category",
    },
    {
      id: "description",
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
    },
  ],
}));
