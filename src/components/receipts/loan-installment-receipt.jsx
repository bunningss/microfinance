"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";

export function LoanInstallmentReceipt({ data }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="space-y-4">
      <Button onClick={reactToPrintFn}>print receipt</Button>

      <div
        className="border border-input rounded-sm px-1 print:mx-2"
        ref={contentRef}
      >
        <h2 className="text-center font-bold py-2 border-b border-input">
          স্বপ্নতরী শ্রমজীবী সমবায় সমিতি লিমিটেড
        </h2>
        <div className="my-2 space-y-2">
          <p>
            সদস্যের নাম: <b>{data?.owner?.name}</b>
          </p>
          <p>
            ফোন নম্বর: <b>{data?.owner?.phone}</b>
          </p>
          <p>
            ঋণের নাম: <b>{data?.loan?.loanName}</b>
          </p>
          <p>
            মোট ঋণ: <b>{translateCurrency(data?.loan.repayAmount)}</b>
          </p>

          <p>
            কিস্তির পরিমাণ:{" "}
            <b>{translateCurrency(data.loan?.installmentAmount)}</b>
          </p>
          <p>
            কিস্তির তারিখ: <b>{translateDate(data?.installment?.date)}</b>
          </p>
          <p>
            কিস্তি পরিশোধের তারিখ:{" "}
            <b>{translateDate(data?.installment?.paymentDate)}</b>
          </p>
          <p>
            কিস্তি গ্রহণকারী কর্মকর্তা:{" "}
            <b>{data?.installment?.receivedBy?.name}</b>
          </p>

          <p>
            মোট কিস্তি: <b>{translateNumber(data.totalInstallments)} টি</b>
          </p>
          <p>
            কিস্তি পরিশোধ করা হয়েছে:{" "}
            <b>{translateNumber(data.paidInstallments)} টি</b>
          </p>
          <p>
            কিস্তি বাকি:{" "}
            <b>
              {translateNumber(data.totalInstallments - data.paidInstallments)}{" "}
              টি
            </b>
          </p>
          <p>
            মোট পরিশোধিত টাকা:{" "}
            <b>{translateCurrency(data?.loan?.amountPaid)}</b>
          </p>
          <p>
            টাকা পরিশোধ বাকি:{" "}
            <b>
              {translateCurrency(
                data?.loan?.repayAmount - data?.loan?.amountPaid
              )}
            </b>
          </p>
        </div>
        <div className="p-2 border-t border-input">
          <p className="text-center">Software Developed By</p>
          <p className="text-center italic font-bold text-muted-foreground">
            {process.env.NEXT_PUBLIC_COMPANY_NAME}
          </p>
        </div>
      </div>
    </div>
  );
}
