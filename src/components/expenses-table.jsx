"use client";

import Link from "next/link";
import { DataTable } from "@/components/data-table";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";

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
    accessorKey: "createdAt",
    cell: (expense) => translateDate(expense.createdAt),
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

export function ExpensesTable({ expenses }) {
  return (
    <DataTable
      columns={columns}
      data={expenses}
      header="খরচের তালিকা"
      withAction
    />
  );
}
