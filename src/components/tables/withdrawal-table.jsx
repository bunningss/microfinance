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
    header: "সদস্যের নাম",
    accessorKey: "owner.name",
  },
  {
    header: "সদস্য নম্বর",
    accessorKey: "owner.memberNumber",
  },
  {
    header: "মোবাইল নম্বর",
    accessorKey: "owner.phone",
  },
  {
    header: "তারিখ",
    accessorKey: "createdAt",
    cell: (withdrawal) => translateDate(withdrawal.createdAt),
  },
  {
    header: "পরিমাণ",
    accessorKey: "amount",
    cell: (withdrawal) => translateCurrency(withdrawal.amount),
  },
  {
    header: "প্রদানকারী কর্মকর্তা",
    accessorKey: "approvedBy.name",
  },
  {
    header: "",
    accessorKey: "id",
    cell: (withdrawal) => (
      <Link
        className="underline text-cyan-800 font-bold"
        href={`/dashboard/savings/savings-installments/receipt/${withdrawal._id}`}
      >
        বিস্তারিত
      </Link>
    ),
  },
];

export function WithdrawalTable({ withdrawals, footer, date }) {
  return (
    <DataTable
      columns={columns}
      data={withdrawals}
      header={`টাকা উত্তোলনের তালিকা ${date ? `- ${translateDate(date)}` : ""}`}
      withAction
      footer={footer}
    />
  );
}
