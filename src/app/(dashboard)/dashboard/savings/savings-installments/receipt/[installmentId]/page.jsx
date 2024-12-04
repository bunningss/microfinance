import React from "react";
import { Block } from "@/components/block";
import { getData } from "@/utils/api-calls";
import { SavingsInstallmentReceipt } from "@/components/receipts/savings-installment-receipt";
import { Preloader } from "@/components/preloader";

async function Receipt({ installmentId }) {
  const { response } = await getData(
    `savings/savings-installments/receipt/${installmentId}`,
    0
  );

  return <SavingsInstallmentReceipt data={response} />;
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
