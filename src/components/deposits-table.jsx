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
    accessorKey: "title",
  },
  {
    header: "তারিখ",
    accessorKey: "createdAt",
    cell: (deposit) => translateDate(deposit.date),
  },
  {
    header: "পরিমাণ",
    accessorKey: "amount",
    cell: (deposit) => translateCurrency(deposit.amount),
  },
  {
    header: "যোগ করেছেন",
    accessorKey: "addedBy.name",
  },
  {
    header: "",
    accessorKey: "id",
    cell: (deposit) => (
      <Link
        className="underline text-cyan-800 font-bold"
        href={`/dashboard/savings/savings-installments/receipt/${deposit._id}`}
      >
        বিস্তারিত
      </Link>
    ),
  },
];

export function DepositsTable({ deposits }) {
  return (
    <DataTable
      columns={columns}
      data={deposits}
      header="জমার তালিকা"
      withAction
    />
  );
}
