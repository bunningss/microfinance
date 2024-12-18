import { Block } from "@/components/block";
import { AddNewSavings } from "@/components/forms/add-new-savings";
import { Preloader } from "@/components/preloader";
import { getData } from "@/utils/api-calls";
import React from "react";

async function AddSavings({ id }) {
  const { response } = await getData(`members/${id}`, 0);

  return <AddNewSavings member={response.payload} />;
}

export default async function Page({ params }) {
  return (
    <div className="space-y-4">
      <Block title="নতুন সঞ্চয় যোগ করুন" />

      <React.Suspense fallback={<Preloader />}>
        <AddSavings id={params.id} />
      </React.Suspense>
    </div>
  );
}
