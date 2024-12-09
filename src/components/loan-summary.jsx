"use client";
import Link from "next/link";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import { Icon } from "@/components/icon";
import { PrintPad } from "./print-pad";
import { Heading } from "./heading";
import { DataTable } from "./tables/data-table";

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
    <PrintPad>
      <Heading className="text-center underline text-xl text-muted-foreground">
        ঋণের বিস্তারিত তথ্য
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-2 gap-2">
        <span>
          সদস্যের নাম: <b>{data?.owner?.name}</b>
        </span>
        <span>
          সদস্য নম্বর: <b>{data?.owner?.memberNumber}</b>
        </span>
        <span>
          ফোন নম্বর: <b>{data?.owner?.phone}</b>
        </span>
        <span>
          ঋণের নাম: <b>{data?.loanName}</b>
        </span>
        <span>
          ঋণের ধরণ: <b>{data?.loanType}</b>
        </span>
        <span>
          শুরুর তারিখ: <b>{translateDate(data?.startDate)}</b>
        </span>
        <span>
          শেষের তারিখ: <b>{translateDate(data?.endDate)}</b>
        </span>
        <span>
          প্রদানকারীর নাম: <b>{data?.approvedBy?.name}</b>
        </span>
        <span>
          ঋণের সময়: <b>{translateNumber(data?.loanDuration)} মাস</b>
        </span>
        <span>
          ঋণের পরিমান: <b>{translateCurrency(data?.loanAmount)}</b>
        </span>
        <span>
          ঋণের পরিশোধের পরিমান: <b>{translateCurrency(data?.repayAmount)}</b>
        </span>
        <span>
          জরিমানা: <b>{translateCurrency(data?.fine)}</b>
        </span>
        <span>
          ঋণের অবস্থা: <b>{data?.loanStatus}</b>
        </span>
      </div>
      <section className="space-y-4">
        <DataTable
          columns={columns}
          data={data?.installments}
          withAction
          header="ঋণের কিস্তিসমূহের তালিকা"
        />
      </section>
    </PrintPad>
  );
}
