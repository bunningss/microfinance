import { Block } from "@/components/block";
import { EmptyItem } from "@/components/empty-item";
import { DateFilter } from "@/components/filters/date-filter";
import { Preloader } from "@/components/preloader";
import { LoanInstallmentsTable } from "@/components/tables/loan-installments-table";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function Installments({ searchParams }) {
  const { date } = searchParams;
  const queryParams = new URLSearchParams({
    ...(date && { date }),
  }).toString();
  const { response } = await getData(
    `loan/loan-installments?${queryParams}`,
    0
  );

  return (
    <>
      {!response.payload?.length && (
        <EmptyItem message="কোন তথ্য পাওয়া যায়নি" />
      )}
      {response.payload?.length > 0 && (
        <LoanInstallmentsTable installments={response.payload} date={date} />
      )}
    </>
  );
}

export default async function Page({ searchParams }) {
  return (
    <div className="space-y-4">
      <Block title="Loan Installments / ঋণের কিস্তিসমূহ" />
      <Suspense fallback={<Preloader />}>
        <DateFilter allowFuture />
        <Installments searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
