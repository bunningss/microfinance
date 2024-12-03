import React from "react";
import { LoanSummary } from "@/components/loan-summary";
import { getData } from "@/utils/api-calls";
import { Preloader } from "@/components/preloader";

async function Summary({ id }) {
  const { response } = await getData(`loan/${id}`, 0);

  return <LoanSummary data={response.payload} />;
}

export default async function Page({ params }) {
  return (
    <div>
      <React.Suspense fallback={<Preloader />}>
        <Summary id={params.id} />
      </React.Suspense>
    </div>
  );
}
