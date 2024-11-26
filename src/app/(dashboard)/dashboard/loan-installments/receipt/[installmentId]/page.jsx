import { Block } from "@/components/block";
import { LoanInstallmentReceipt } from "@/components/loan-installment-receipt";
import { getData } from "@/utils/api-calls";

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
      <Receipt installmentId={params.installmentId} />
    </div>
  );
}
