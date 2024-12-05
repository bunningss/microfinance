import React from "react";
import { Block } from "@/components/block";
import { DepositFilters } from "@/components/filters/deposit-filters";
import { PrintPad } from "@/components/print-pad";
import { DepositsTable } from "@/components/deposits-table";
import { Preloader } from "@/components/preloader";

async function Deposits() {
  return <DepositsTable />;
}

export default async function Page() {
  return (
    <div className="space-y-4">
      <Block title="জমার তালিকা" />
      <DepositFilters />
      <React.Suspense fallback={<Preloader />}>
        <PrintPad>
          <Deposits />
        </PrintPad>
      </React.Suspense>
    </div>
  );
}
