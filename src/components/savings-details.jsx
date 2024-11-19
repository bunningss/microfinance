"use client";
import { useState } from "react";
import { SearchMemberInstallments } from "./forms/search-member-installments";
import { SavingsCard } from "./cards/savings-card";
import { CardView } from "./card-view";
import { EmptyItem } from "./empty-item";

export function SavingsDetails() {
  const [savingsData, setSavingsData] = useState(null);

  return (
    <>
      <SearchMemberInstallments setSavingsData={setSavingsData} />
      {!savingsData?.savings?.length && (
        <EmptyItem message="কোন তথ্য পাওয়া যায়নি" />
      )}
      {savingsData?.savings?.length && (
        <CardView>
          {savingsData?.savings?.map((item, index) => (
            <SavingsCard
              key={index}
              data={item}
              installments={item?.installments}
            />
          ))}
        </CardView>
      )}
    </>
  );
}
