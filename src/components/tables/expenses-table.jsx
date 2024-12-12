"use client";

import Link from "next/link";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import { DataTable } from "./data-table";

const columns = [
  {
    header: "সি. নং",
    accessorKey: "index",
    cell: (_, index) => translateNumber(index + 1),
  },
  {
    header: "নাম",
    accessorKey: "name",
  },
  {
    header: "তারিখ",
    accessorKey: "date",
    cell: (expense) => translateDate(expense.date),
  },
  {
    header: "পরিমাণ",
    accessorKey: "amount",
    cell: (expense) => translateCurrency(expense.amount),
  },
  {
    header: "যোগ করেছেন",
    accessorKey: "addedBy.name",
  },
  {
    header: "",
    accessorKey: "id",
    cell: () => (
      <div>
        <Link href="" className="underline text-cyan-800 font-bold">
          বিস্তারিত
        </Link>
      </div>
    ),
  },
];

export function ExpensesTable({ expenses, footer, date }) {
  return (
    <DataTable
      columns={columns}
      data={expenses}
      header={`খরচের তালিকা - ${date}`}
      withAction
      footer={footer}
    />
  );
}
