import React from "react";
import { Block } from "@/components/block";
import { Preloader } from "@/components/preloader";
import { getData } from "@/utils/api-calls";
import { DepositsTable } from "@/components/tables/deposits-table";
import { ExpensesTable } from "@/components/tables/expenses-table";
import { TableTotal } from "@/components/table-total";
import { WithdrawalTable } from "@/components/tables/withdrawal-table";
import { DateFilter } from "@/components/filters/date-filter";
import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import { PrintPad } from "@/components/print-pad";
import { SalaryTable } from "@/components/salary-table";

async function Reports({ searchParams }) {
  const { date } = searchParams;
  const queryParams = new URLSearchParams({
    ...(date && { date }),
  }).toString();

  const { response } = await getData(`daily-report?${queryParams}`, 0);

  const positives =
    response.payload?.paidInstallments?.savings?.total +
    response.payload?.paidInstallments?.loans?.total +
    response.payload?.totalDeposits;

  const negatives =
    response.payload?.totalExpenses +
    response.payload?.totalWithdrawals +
    response.payload?.totalSalaries;

  return (
    <div className="space-y-8">
      <h4 className="text-center text-lg text-primary underline decoration-double">
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
      {response.payload?.deposits?.length > 0 && (
        <DepositsTable
          date={translateDate(date ? date : new Date())}
          deposits={response.payload?.deposits}
          footer={<TableTotal total={response.payload?.totalDeposits} />}
        />
      )}

      {response.payload?.expenses?.length > 0 && (
        <ExpensesTable
          expenses={response.payload?.expenses}
          date={translateDate(date ? date : new Date())}
          footer={<TableTotal total={response.payload?.totalExpenses} />}
        />
      )}
      {response.payload?.withdrawals?.length > 0 && (
        <WithdrawalTable
          date={translateDate(date ? date : new Date())}
          withdrawals={response.payload?.withdrawals}
          footer={
            <TableTotal
              colspan={5}
              total={response.payload?.totalWithdrawals}
            />
          }
        />
      )}

      {response.payload?.salaries?.length > 0 && (
        <SalaryTable
          salaries={response.payload?.salaries}
          footer={
            <TableTotal colspan={5} total={response.payload?.totalSalaries} />
          }
        />
      )}

      <Block title="total / মোট হিসাব">
        <p className="flex justify-between text-lg">
          পূর্ববর্তী ব্যালান্স:{" "}
          <b>{translateCurrency(response.payload?.cashAtHand)}</b>
        </p>
        <p className="flex justify-between text-lg">
          আজকের জমা: <b>{translateCurrency(positives)}</b>
        </p>
        <p className="flex justify-between text-lg">
          আজকের ব্যয়: <b>{translateCurrency(negatives)}</b>
        </p>
        <p className="flex justify-between text-lg border-t border-primary">
          বর্তমান ব্যালান্স:{" "}
          <b>
            {translateCurrency(
              response.payload?.cashAtHand + positives - negatives
            )}
          </b>
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
