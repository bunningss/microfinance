import React from "react";
import { InfoCard } from "@/components/info-card";
import { getData } from "@/utils/api-calls";
import { translateCurrency, translateNumber } from "@/utils/helpers";
import { Block } from "@/components/block";
import { Preloader } from "@/components/preloader";

async function SummaryData() {
  const { response } = await getData("dashboard-data");

  const summary = [
    {
      icon: "members",
      dataKey: "মোট সদস্য সংখ্যা",
      dataValue: translateNumber(response.payload?.totalMembers),
    },
    {
      icon: "expense",
      dataKey: "মোট ঋণ দেয়া হয়েছে",
      dataValue: translateCurrency(response.payload?.totalLoans),
    },
    {
      icon: "loan",
      dataKey: "মোট ঋণ পরিশোধ করবে",
      dataValue: translateCurrency(response.payload?.repayableLoans),
    },
    {
      icon: "note",
      dataKey: "মোট ঋণ পরিশোধ করেছে",
      dataValue: translateCurrency(response.payload?.loanRepaid),
    },
    {
      icon: "note",
      dataKey: "ঋণ পরিশোধ বাকি আছে",
      dataValue: translateCurrency(
        response.payload?.repayableLoans - response.payload?.loanRepaid
      ),
    },
    {
      icon: "money",
      dataKey: "মোট সঞ্চয়",
      dataValue: translateCurrency(response.payload?.totalSavings),
    },
    {
      icon: "money",
      dataKey: "সদস্যরা মোট জমা করেছে",
      dataValue: translateCurrency(response.payload?.currentAmountByMembers),
    },
  ];

  return (
    <Block title="Summary">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {summary?.map((item, index) => (
          <InfoCard key={index} data={item} />
        ))}
      </div>
    </Block>
  );
}

export default async function Page() {
  return (
    <div className="space-y-4">
      <React.Suspense fallback={<Preloader />}>
        <SummaryData />
      </React.Suspense>
    </div>
  );
}
