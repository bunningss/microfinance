"use client";
import Link from "next/link";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import { DataTable } from "@/components/data-table";
import { Icon } from "@/components/icon";

export function SavingsSummary({ data }) {
  const columns = [
    {
      header: "সি. নং",
      accessorKey: "index",
      cell: (_, index) => translateNumber(index + 1),
    },
    {
      header: "সঞ্চয়ের নাম",
      accessorKey: "savingsName",
      cell: () => data.savingsName,
    },
    {
      header: "কিস্তির তারিখ",
      accessorKey: "date",
      cell: (item) => translateDate(item.date),
    },
    {
      header: "কিস্তির পরিমান",
      accessorKey: "amount",
      cell: (item) => translateCurrency(item.amount),
    },
    {
      header: "কিস্তির বর্তমান অবস্থা",
      accessorKey: "status",
      cell: (item) => (
        <div
          className={`flex justify-center ${
            item.status === "paid" ? "text-green-800" : "text-destructive"
          }`}
        >
          <Icon icon={item.status === "paid" ? "done" : "close"} />
        </div>
      ),
    },
    {
      header: "",
      accessorKey: "_id",
      cell: (item) => (
        <div className="print:hidden">
          <Link
            className="underline text-cyan-800 font-bold"
            href={`/dashboard/savings-installments/receipt/${item._id}`}
          >
            বিস্তারিত
          </Link>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <span>শুরুর তারিখ: {translateDate(data?.startDate)}</span>
        <span>শেষের তারিখ: {translateDate(data?.endDate)}</span>
        <span>সদস্যের নাম: {data?.owner?.name}</span>
        <span>ফোন নম্বর: {data?.owner?.phone}</span>
        <span>সঞ্চয়ের নাম: {data?.savingsName}</span>
        <span>প্রদানকারীর নাম: {data?.approvedBy?.name}</span>
        <span>সঞ্চয়ের ধরণ: {data?.savingsType}</span>
        <span>সঞ্চয়ের সময়: {translateNumber(data?.savingsDuration)} মাস</span>
        <span>সঞ্চয়ের পরিমান: {data?.savingsAmount}</span>
        <span>সঞ্চয়ের অবস্থা: {data?.savingsStatus}</span>
      </div>
      <DataTable
        columns={columns}
        data={data.installments}
        printable
        withAction
      />
    </section>
  );
}
