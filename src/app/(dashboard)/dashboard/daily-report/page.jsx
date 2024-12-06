import React from "react";
import { Block } from "@/components/block";
import { Preloader } from "@/components/preloader";
import { getData } from "@/utils/api-calls";

async function Reports() {
  const today = new Date().toISOString();

  const deposits = await getData("deposits");
  const expenses = await getData(`expenses?date=${today}`);

  return <div>Daily report</div>;
}

export default async function Page() {
  return (
    <div className="space-y-4">
      <Block title="daily report / দৈনিক হিসাব" />
      <React.Suspense fallback={<Preloader />}>
        <Reports />
      </React.Suspense>
    </div>
  );
}
