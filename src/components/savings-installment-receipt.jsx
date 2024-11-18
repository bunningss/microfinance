"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "./ui/button";

export function SavingsInstallmentReceipt({ data }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div>
      <Button onClick={reactToPrintFn}>print receipt</Button>
      <div className="flex  items-center justify-center">
        <div
          className="border border-input w-[56mm] rounded-sm px-1 py-2 text-xs"
          ref={contentRef}
        >
          <h2 className="text-center font-bold py-2 border-b border-input">
            Shopnotori
          </h2>
          <div className="my-2 space-y-2">
            <p>Owner name: {data?.owner?.name}</p>
            <p>Owner phone: {data?.owner?.phone}</p>
            <p>total saved: {data?.owner?.totalSaved}</p>

            <p>Savings name: {data?.savings?.savingsName}</p>

            <p>
              Installment date:{" "}
              {new Date(data?.installment?.date).toDateString()}
            </p>
            <p>
              Installment payment date: {new Date(Date.now()).toDateString()}
            </p>

            <p>Total installments: {data.totalInstallments}</p>
            <p>Installments paid: {data.paidInstallments}</p>
            <p>
              Installments remaining:{" "}
              {data.totalInstallments - data.paidInstallments}
            </p>
            <p>
              Amount saved under {data?.savings?.savingsName}:{" "}
              {data?.savings?.amountSaved}
            </p>
          </div>
          <div className="p-2 border-t border-input">
            <p className="text-center">DUM DUM Technologies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
