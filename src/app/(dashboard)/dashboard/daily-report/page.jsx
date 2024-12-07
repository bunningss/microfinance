import React from "react";
import { Block } from "@/components/block";
import { Preloader } from "@/components/preloader";
import { getData } from "@/utils/api-calls";
import { DepositsTable } from "@/components/deposits-table";
import { ExpensesTable } from "@/components/expenses-table";
import { TableTotal } from "@/components/table-total";
import { WithdrawalTable } from "@/components/tables/withdrawal-table";
import { DateFilter } from "@/components/filters/date-filter";

async function Reports({ searchParams }) {
  const { date } = searchParams;
  const queryParams = new URLSearchParams({
    ...(date && { date }),
  }).toString();

  const { response } = await getData(`daily-report?${queryParams}`, 0);

  return (
    <div className="space-y-8">
      <DepositsTable
        deposits={response.payload?.deposits}
        footer={<TableTotal />}
      />

      <ExpensesTable
        expenses={response.payload?.expenses}
        footer={<TableTotal />}
      />

      <WithdrawalTable
        withdrawals={response.payload?.withdrawals}
        footer={<TableTotal colspan={7} />}
      />
    </div>
  );
}

export default async function Page({ searchParams }) {
  return (
    <div className="space-y-4">
      <Block title="daily report / দৈনিক হিসাব" />
      <DateFilter />
      <React.Suspense fallback={<Preloader />}>
        <Reports searchParams={searchParams} />
      </React.Suspense>
    </div>
  );
}
