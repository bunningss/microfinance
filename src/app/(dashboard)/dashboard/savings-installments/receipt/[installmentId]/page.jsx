import React from "react";
import { Block } from "@/components/block";
import { SavingsInstallmentReceipt } from "@/components/savings-installment-receipt";
import { getData } from "@/utils/api-calls";

async function Receipt({ installmentId }) {
  const { response } = await getData(
    `savings-installments/receipt/${installmentId}`,
    0
  );

  return <SavingsInstallmentReceipt data={response} />;
}

export default async function Page({ params }) {
  return (
    <div className="space-y-4">
      <Block title="Receipt" />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Receipt installmentId={params.installmentId} />
      </React.Suspense>
    </div>
  );
}
