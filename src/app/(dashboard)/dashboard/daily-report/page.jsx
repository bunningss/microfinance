import React from "react";
import { Block } from "@/components/block";
import { Preloader } from "@/components/preloader";
import { getData } from "@/utils/api-calls";
import { DepositsTable } from "@/components/deposits-table";
import { ExpensesTable } from "@/components/expenses-table";
import { TableTotal } from "@/components/table-total";
import { WithdrawalTable } from "@/components/tables/withdrawal-table";
import { DateFilter } from "@/components/filters/date-filter";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import { PrintPad } from "@/components/print-pad";

async function Reports({ searchParams }) {
  const { date } = searchParams;
  const queryParams = new URLSearchParams({
    ...(date && { date }),
  }).toString();

  const { response } = await getData(`daily-report?${queryParams}`, 0);

  const positives =
    response.payload?.paidInstallments?.savings?.total +
    response.payload?.paidInstallments?.loans?.total +
    response.payload?.totalDeposits?.total;

  const negatives =
    response.payload?.totalExpenses?.total +
    response.payload?.totalWithdrawals?.total;

  return (
    <div className="space-y-8">
      <h4 className="text-center text-lg underline decoration-double">
        {translateDate(date ? date : new Date())}
      </h4>
      <div className="space-y-2">
        <p className="flex justify-between">
          {translateNumber(response.payload?.paidInstallments?.savings?.count)}{" "}
          টি সঞ্চয় কিস্তি তোলা হয়েছে সর্বমোট:{" "}
          <b>
            {translateCurrency(
              response.payload?.paidInstallments?.savings?.total
            )}
          </b>
        </p>
        <p className="flex justify-between">
          {translateNumber(response.payload?.paidInstallments?.loans?.count)} টি
          ঋণের কিস্তি তোলা হয়েছে সর্বমোট:{" "}
          <b>
            {translateCurrency(
              response.payload?.paidInstallments?.loans?.total
            )}
          </b>
        </p>
      </div>
      <DepositsTable
        deposits={response.payload?.deposits}
        footer={<TableTotal total={response.payload?.totalDeposits?.total} />}
      />

      <ExpensesTable
        expenses={response.payload?.expenses}
        footer={<TableTotal total={response.payload?.totalExpenses?.total} />}
      />

      <WithdrawalTable
        withdrawals={response.payload?.withdrawals}
        footer={
          <TableTotal
            colspan={5}
            total={response.payload?.totalWithdrawals?.total}
          />
        }
      />
      <Block title="total / মোট হিসাব">
        <p className="flex justify-between text-lg">
          হাতে আছে: <b></b>
        </p>
        <p className="flex justify-between text-lg">
          মোট জমা: <b>{translateCurrency(positives)}</b>
        </p>
        <p className="flex justify-between text-lg">
          মোট খরছ: <b>{translateCurrency(negatives)}</b>
        </p>
        <p className="flex justify-between text-lg border-t border-primary">
          বাকি আছে: <b>{translateCurrency(positives - negatives)}</b>
        </p>
      </Block>
    </div>
  );
}

export default async function Page({ searchParams }) {
  return (
    <div className="space-y-4">
      <Block title="daily report / দৈনিক হিসাব" />
      <DateFilter />
      <React.Suspense fallback={<Preloader />}>
        <PrintPad>
          <Reports searchParams={searchParams} />
        </PrintPad>
      </React.Suspense>
    </div>
  );
}
