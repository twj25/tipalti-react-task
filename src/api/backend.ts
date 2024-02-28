import { ExpensesSchema } from "../schemas/backend";

export const getExpenses = async () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const response = await fetch(`${baseURL}/expenses`, {
    headers: {
      "Content-Type": "application/json",
      Username: "tom.johnson",
    },
  });
  const data = await response.json();
  // We are using zod to parse the data from the backend
  // This ensures the data is in the correct shape
  return ExpensesSchema.parse(data);
};
