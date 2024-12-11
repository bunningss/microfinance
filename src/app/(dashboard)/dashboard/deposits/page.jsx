import React from "react";
import { Block } from "@/components/block";
import { PrintPad } from "@/components/print-pad";
import { DepositsTable } from "@/components/tables/deposits-table";
import { Preloader } from "@/components/preloader";
import { getData } from "@/utils/api-calls";
import { EmptyItem } from "@/components/empty-item";
import { AddNewDeposit } from "@/components/modals/add-new-deposit";
import { DateFilter } from "@/components/filters/date-filter";

async function Deposits({ searchParams }) {
  const { date } = searchParams;
  const queryParams = new URLSearchParams({
    ...(date && { date }),
  }).toString();

  const { response } = await getData(`deposits?${queryParams}`, 0);

  return (
    <>
      {response.payload?.length <= 0 && <EmptyItem />}
      {response.payload?.length > 0 && (
        <DepositsTable deposits={response.payload} />
      )}
    </>
  );
}

export default async function Page({ searchParams }) {
  return (
    <div className="space-y-4">
      <Block title="Deposits / জমার তালিকা" />
      <div className="grid md:grid-cols-2 gap-2 md:gap-4">
        <DateFilter />
        <AddNewDeposit />
      </div>
      <React.Suspense fallback={<Preloader />}>
        <PrintPad>
          <Deposits searchParams={searchParams} />
        </PrintPad>
      </React.Suspense>
    </div>
  );
}
