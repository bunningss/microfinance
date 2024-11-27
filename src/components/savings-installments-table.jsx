"use client";
import {
  translateNumber,
  translateCurrency,
  translateDate,
} from "@/utils/helpers";
import { PayInstallment } from "./modals/pay-installment";
import { DataTable } from "./data-table";

const columns = [
  {
    header: "সি. নং",
    accessorKey: "id",
    cell: (_, index) => translateNumber(index + 1),
  },
  {
    header: "সদস্যের নাম",
    accessorKey: "memberDetails.name",
  },
  {
    header: "ফোন নম্বর",
    accessorKey: "memberDetails.phone",
  },
  {
    header: "সদস্য নম্বর",
    accessorKey: "memberDetails.nidNumber",
  },
  {
    header: "সঞ্চয়ের নাম",
    accessorKey: "savingsName",
  },
  {
    header: "সঞ্চয়ের ধরন",
    accessorKey: "savingsType",
  },
  {
    header: "সঞ্চয় পরিমাণ",
    accessorKey: "savingsAmount",
    cell: (item) => translateCurrency(item.savingsAmount),
  },
  {
    header: "কিস্তির তারিখ",
    accessorKey: "installments",
    cell: (item) => translateDate(item.installments[0].date),
  },
  {
    header: "",
    accessorKey: "installments",
    cell: (item) => (
      <PayInstallment
        label="pay"
        type="savings"
        installments={item.installments}
      />
    ),
  },
];

export function SavingsInstallmentsTable({ installments }) {
  return <DataTable columns={columns} data={installments} printable />;
}
