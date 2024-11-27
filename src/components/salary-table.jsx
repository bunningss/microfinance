"use client";
import { DataTable } from "@/components/data-table";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";

const columns = [
  {
    header: "সি. নং",
    accessorKey: "id",
    cell: (_, index) => translateNumber(index + 1),
  },
  {
    header: "কর্মচারীর নাম",
    accessorKey: "staff.name",
  },
  {
    header: "মাস",
    accessorKey: "month",
  },
  {
    header: "প্রদানের তারিখ",
    accessorKey: "createdAt",
    cell: (item) => translateDate(item.createdAt),
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
  return <DataTable columns={columns} data={salaries} printable />;
}
