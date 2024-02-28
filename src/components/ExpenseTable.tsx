import { useState } from "react";
import { useExpenseStore } from "../store";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { fuzzyFilter } from "../utils/filtering";
import { Filter } from "./FilterInput";

export default function ExpenseTable() {
  const expenses = useExpenseStore((state) => state.expenses);
  const columns = useExpenseStore((state) => state.columns);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Tanstack table is handling a lot of the heavy lifting when it comes to filtering and sorting the data
  const table = useReactTable({
    data: expenses,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <div className="flex h-full gap-8 px-8 border-t-2 pt-6">
      <div className="flex flex-col gap-2 w-80">
        <p className="font-bold">Filter Columns</p>
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => {
            return (
              <div
                key={header.column.columnDef.id + "-sort"}
                className="flex justify-between"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                <div className="">
                  {header.column.getCanFilter() ? (
                    <Filter column={header.column} table={table} />
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      <div>
        <table className="col-span-3">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="border h-10">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-4">
                        {cell.column.columnDef.id === "amount" && "£"}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
