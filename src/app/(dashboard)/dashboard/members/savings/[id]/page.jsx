import React from "react";
import { Preloader } from "@/components/preloader";
import { SavingsSummary } from "@/components/savings-summary";
import { getData } from "@/utils/api-calls";
import { MemberForm } from "@/components/member-form";
import { Block } from "@/components/block";

async function Summary({ id }) {
  const { response } = await getData(`savings/${id}`, 0);

  return (
    <>
      <MemberForm member={response.payload?.owner} nominee={response.payload} />
      <SavingsSummary data={response.payload} />;
    </>
  );
}

export default async function Page({ params }) {
  return (
    <div className="space-y-4">
      <Block title="Savings Summary / সঞ্চয় তথ্য" />
      <React.Suspense fallback={<Preloader />}>
        <Summary id={params.id} />
      </React.Suspense>
    </div>
  );
}
