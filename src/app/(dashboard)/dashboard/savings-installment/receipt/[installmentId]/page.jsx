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
      <Receipt installmentId={params.installmentId} />
    </div>
  );
}
