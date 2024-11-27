import React from "react";
import { LoanSummary } from "@/components/loan-summary";
import { getData } from "@/utils/api-calls";

async function Summary({ id }) {
  const { response } = await getData(`loan/${id}`, 0);

  return <LoanSummary data={response.payload} />;
}

export default async function Page({ params }) {
  return (
    <div>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Summary id={params.id} />
      </React.Suspense>
    </div>
  );
}
