import { Block } from "@/components/block";
import { EmptyItem } from "@/components/empty-item";
import { InstallmentsFilters } from "@/components/filters/installment-filters";
import { SavingsInstallmentsTable } from "@/components/savings-installments-table";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function Installments({ searchParams }) {
  const { date } = searchParams;
  const queryParams = new URLSearchParams({
    ...(date && { date }),
  }).toString();
  const { response } = await getData(
    `savings/savings-installments?${queryParams}`,
    0
  );

  return (
    <>
      {!response.payload?.length && (
        <EmptyItem message="কোন তথ্য পাওয়া যায়নি" />
      )}
      {response.payload?.length > 0 && (
        <SavingsInstallmentsTable installments={response.payload} date={date} />
      )}
    </>
  );
}

export default async function Page({ searchParams }) {
  return (
    <div className="space-y-4">
      <Block title="Savings Installments / সঞ্চয় কিস্তিসমূহ" />
      <Suspense fallback={<div>Loading...</div>}>
        <InstallmentsFilters />
        <Installments searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
