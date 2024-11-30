"use client";
import Link from "next/link";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import { DataTable } from "@/components/data-table";
import { Icon } from "@/components/icon";

export function LoanSummary({ data }) {
  const columns = [
    {
      header: "সি. নং",
      accessorKey: "index",
      cell: (_, index) => translateNumber(index + 1),
    },
    {
      header: "ঋণের নাম",
      accessorKey: "loanName",
      cell: () => data.loanName,
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
        <Link
          className="underline text-cyan-800 font-bold"
          href={`/dashboard/loan/loan-installments/receipt/${item._id}`}
        >
          বিস্তারিত
        </Link>
      ),
    },
  ];

  return (
    <section>
      <div>
        <DataTable
          columns={columns}
          data={data.installments}
          printable
          withAction
        />
      </div>
    </section>
  );
}
