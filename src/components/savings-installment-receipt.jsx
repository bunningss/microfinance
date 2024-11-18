"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "./ui/button";

export function SavingsInstallmentReceipt({ data }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="space-y-4">
      <Button onClick={reactToPrintFn}>print receipt</Button>

      <div
        className="border border-input rounded-sm px-1 print:mx-2 text-sm mb-2"
        ref={contentRef}
      >
        <h2 className="text-center font-bold py-2 border-b border-input">
          Shopnotori
        </h2>
        <div className="my-2 space-y-2">
          <p>নাম: {data?.owner?.name}</p>
          <p>ফোন নম্বর: {data?.owner?.phone}</p>
          <p>
            মোট সঞ্চয়: <b>৳{data?.owner?.totalSaved}</b>
          </p>

          <p>
            সঞ্চয়ের নাম: <b>{data?.savings?.savingsName}</b>
          </p>
          <p>
            কিস্তির পরিমাণ: <b>৳{data.savings?.savingsAmount}</b>
          </p>
          <p>
            কিস্তির তারিখ: {new Date(data?.installment?.date).toDateString()}
          </p>
          <p>কিস্তি পরিশোধের তারিখ: {new Date(Date.now()).toDateString()}</p>
          <p>
            কিস্তি গ্রহণকারী কর্মকর্তা: {data?.installment?.receivedBy?.name}
          </p>

          <p>মোট কিস্তি: {data.totalInstallments}</p>
          <p>কিস্তি পরিশোধ করা হয়েছে: {data.paidInstallments}</p>
          <p>কিস্তি বাকি: {data.totalInstallments - data.paidInstallments}</p>
          <p>
            <b>{data?.savings?.savingsName}</b> অধীনে সঞ্চয় :
            <b>৳{data?.savings?.amountSaved}</b>
          </p>
        </div>
        <div className="p-2 border-t border-input">
          <p className="text-center italic font-bold text-muted-foreground">
            {process.env.NEXT_PUBLIC_COMPANY_NAME}
          </p>
        </div>
      </div>
    </div>
  );
}
