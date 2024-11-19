import { Block } from "@/components/block";
import { SavingsInstallmentsTable } from "@/components/savings-installments-table";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function Installments() {
  const { error, response } = await getData("savings-installments", 0);
  if (error) throw new Error("Failed to fetch data");

  return <SavingsInstallmentsTable installments={response.payload} />;
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
