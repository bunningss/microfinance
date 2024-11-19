"use client";
import { useRef } from "react";
import { Button } from "./ui/button";
import { useReactToPrint } from "react-to-print";
import { formatNumber } from "@/utils/helpers";

export function ExpensesTable({ expenses }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <Button onClick={reactToPrintFn}>Print Data</Button>
      <table
        className="w-full rounded-md border border-primary md:border-secondary text-xs md:text-base"
        ref={contentRef}
      >
        <thead>
          <tr className="text-center bg-input">
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              SN
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              নাম
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              তারিখ
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              পরিমাণ
            </th>
            <th scope="col" className="p-2 md:border-0">
              যোগ করেছেন
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense, index) => (
            <tr key={index} className="text-center even:bg-secondary">
              <td className="p-2 border-r border-primary md:border-secondary">
                {index + 1}
              </td>
              <th
                scope="row"
                className="p-2 border-r border-primary md:border-secondary"
              >
                {expense?.name}
              </th>
              <td className="p-2 border-r border-primary md:border-secondary">
                {new Date(expense.createdAt).toDateString()}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {formatNumber(expense?.amount)}
              </td>
              <td className="p-2 md:border-0">{expense.addedBy?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
