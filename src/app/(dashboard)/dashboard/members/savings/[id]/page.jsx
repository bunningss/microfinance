import { SavingsSummary } from "@/components/savings-summary";
import { getData } from "@/utils/api-calls";
import React from "react";

async function Summary({ id }) {
  const { response } = await getData(`savings/${id}`, 0);

  return <SavingsSummary data={response.payload} />;
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
