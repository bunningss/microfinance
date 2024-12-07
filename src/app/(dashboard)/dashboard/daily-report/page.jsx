import React from "react";
import { Block } from "@/components/block";
import { Preloader } from "@/components/preloader";
import { getData } from "@/utils/api-calls";
import { DepositsTable } from "@/components/deposits-table";
import { ExpensesTable } from "@/components/expenses-table";
import { TableTotal } from "@/components/table-total";
import { WithdrawalTable } from "@/components/tables/withdrawal-table";
import { DateFilter } from "@/components/filters/date-filter";

async function Reports() {
  const today = new Date().toISOString();

  const deposits = await getData("deposits");
  const expenses = await getData(`expenses?date=${today}`);
  const withdrawals = await getData(`expenses/withdraw?date=${today}`, 0);

  const totalDeposits = deposits.response.payload.reduce(
    (a, c) => a + c.amount,
    0
  );
  const totalExpenses = expenses.response.payload.reduce(
    (a, c) => a + c.amount,
    0
  );
  const totalWithdrawals = withdrawals.response.payload.reduce(
    (a, c) => a + c.amount,
    0
  );

  return (
    <div className="space-y-8">
      <DepositsTable
        deposits={deposits.response.payload}
        footer={<TableTotal total={totalDeposits} />}
      />

      <ExpensesTable
        expenses={expenses.response.payload}
        footer={<TableTotal total={totalExpenses} />}
      />

      <WithdrawalTable
        withdrawals={withdrawals.response.payload}
        footer={<TableTotal total={totalWithdrawals} />}
      />
    </div>
  );
}

export default async function Page() {
  return (
    <div className="space-y-4">
      <Block title="daily report / দৈনিক হিসাব" />
      <DateFilter />
      <React.Suspense fallback={<Preloader />}>
        <Reports />
      </React.Suspense>
    </div>
  );
}
