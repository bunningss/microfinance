"use client";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import { DataTable } from "./tables/data-table";

const columns = [
  {
    header: "সি. নং",
    accessorKey: "id",
    cell: (_, index) => translateNumber(index + 1),
  },
  {
    header: "কর্মীর নাম",
    accessorKey: "staff.name",
  },
  {
    header: "মাস",
    accessorKey: "month",
  },
  {
    header: "প্রদানের তারিখ",
    accessorKey: "paymentDate",
    cell: (item) => translateDate(item.paymentDate),
  },
  {
    header: "বেতন",
    accessorKey: "amount",
    cell: (item) => translateCurrency(item.amount),
  },
  {
    header: "প্রদানকারীর নাম",
    accessorKey: "addedBy.name",
  },
];

export function SalaryTable({ salaries }) {
  return (
    <DataTable
      columns={columns}
      data={salaries}
      header="কর্মীদের বেতনের তালিকা"
    />
  );
}
