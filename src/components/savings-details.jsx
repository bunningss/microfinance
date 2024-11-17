"use client";
import { useState } from "react";
import { SearchMemberInstallments } from "./forms/search-member-installments";
import { SavingsCard } from "./cards/savings-card";
import { CardView } from "./card-view";

export function SavingsDetails() {
  const [savingsData, setSavingsData] = useState(null);

  return (
    <>
      <SearchMemberInstallments setSavingsData={setSavingsData} />

      <CardView>
        {savingsData?.savings?.map((item, index) => (
          <SavingsCard
            key={index}
            data={item}
            installments={item?.installments}
          />
        ))}
      </CardView>
    </>
  );
}
