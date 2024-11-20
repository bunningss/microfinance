import { Block } from "@/components/block";
import { EmptyItem } from "@/components/empty-item";
import { SavingsInstallmentsTable } from "@/components/savings-installments-table";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function Installments() {
  const { response } = await getData("savings-installments", 0);

  return (
    <>
      {!response.payload?.length && (
        <EmptyItem message="কোন তথ্য পাওয়া যায়নি" />
      )}
      {response.payload?.length > 0 && (
        <SavingsInstallmentsTable installments={response.payload} />
      )}
    </>
  );
}

export default async function Page() {
  return (
    <div className="space-y-4">
      <Block title="Installments" />
      <Suspense fallback={<div>Loading...</div>}>
        <Installments />
      </Suspense>
    </div>
  );
}
