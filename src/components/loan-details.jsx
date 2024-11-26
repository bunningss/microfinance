"use client";
import { useState } from "react";
import { SearchMemberInstallments } from "./forms/search-member-installments";
import { CardView } from "./card-view";
import { EmptyItem } from "./empty-item";
import { LoanCard } from "./cards/loan-card";

export function LoanDetails() {
  const [loanData, setLoanData] = useState(null);

  return (
    <>
      <SearchMemberInstallments setData={setLoanData} type="loan" />
      {!loanData?.loans?.length && (
        <EmptyItem message="কোন তথ্য পাওয়া যায়নি" />
      )}
      {loanData?.loans?.length > 0 && (
        <CardView>
          {loanData?.loans?.map((item, index) => (
            <LoanCard
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
