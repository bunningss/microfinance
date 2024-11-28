"use client";
import Link from "next/link";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import { DataTable } from "@/components/data-table";
import { Icon } from "@/components/icon";
import { Button } from "./ui/button";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Heading } from "./heading";

export function SavingsSummary({ data }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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
    <section className="space-y-4 print:px-2" ref={contentRef}>
      <Button onClick={reactToPrintFn} className="print:hidden">
        Print data
      </Button>
      <Heading className="text-center underline text-xl text-muted-foreground">
        সঞ্চয়ের বিস্তারিত তথ্য
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-2 gap-2">
        <span>
          সদস্যের নাম: <b>{data?.owner?.name}</b>
        </span>
        <span>
          ফোন নম্বর: <b>{data?.owner?.phone}</b>
        </span>
        <span>
          সঞ্চয়ের নাম: <b>{data?.savingsName}</b>
        </span>
        <span>
          সঞ্চয়ের ধরণ: <b>{data?.savingsType}</b>
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
          সঞ্চয়ের সময়: <b>{translateNumber(data?.savingsDuration)} মাস</b>
        </span>
        <span>
          সঞ্চয়ের পরিমান: <b>{data?.savingsAmount}</b>
        </span>
        <span>
          সঞ্চয়ের অবস্থা: <b>{data?.savingsStatus}</b>
        </span>
      </div>
      <DataTable
        columns={columns}
        data={data.installments}
        header="সঞ্চয় কিস্তিসমূহের তালিকা"
        withAction
      />
    </section>
  );
}
