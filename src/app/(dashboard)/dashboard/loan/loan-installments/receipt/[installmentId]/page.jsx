import React from "react";
import { Block } from "@/components/block";
import { getData } from "@/utils/api-calls";
import { LoanInstallmentReceipt } from "@/components/receipts/loan-installment-receipt";
import { Preloader } from "@/components/preloader";

async function Receipt({ installmentId }) {
  const { response } = await getData(
    `loan/loan-installments/receipt/${installmentId}`,
    0
  );

  return <LoanInstallmentReceipt data={response} />;
}

export default async function Page({ params }) {
  return (
    <div className="space-y-4">
      <Block title="Receipt" />
      <React.Suspense fallback={<Preloader />}>
        <Receipt installmentId={params.installmentId} />
      </React.Suspense>
    </div>
  );
}
