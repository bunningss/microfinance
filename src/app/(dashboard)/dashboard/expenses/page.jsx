import { Block } from "@/components/block";
import { ExpensesTable } from "@/components/tables/expenses-table";
import { Preloader } from "@/components/preloader";
import { PrintPad } from "@/components/print-pad";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";
import { EmptyItem } from "@/components/empty-item";
import { DateFilter } from "@/components/filters/date-filter";
import { translateDate } from "@/utils/helpers";

async function Expenses({ searchParams }) {
  const { date } = searchParams;
  const queryParams = new URLSearchParams({
    ...(date && { date }),
  }).toString();

  const { response } = await getData(`expenses?${queryParams}`, 0);

  return (
    <>
      {response.payload?.length <= 0 && (
        <EmptyItem message="কোন তথ্য পাওয়া যায়নি" />
      )}
      {response.payload?.length > 0 && (
        <ExpensesTable
          expenses={response.payload}
          date={translateDate(date ? date : new Date())}
        />
      )}
    </>
  );
}

export default async function Page({ searchParams }) {
  return (
    <div className="space-y-4">
      <Block title="view expenses" />
      <DateFilter />
      <Suspense fallback={<Preloader />}>
        <PrintPad>
          <Expenses searchParams={searchParams} />
        </PrintPad>
      </Suspense>
    </div>
  );
}
