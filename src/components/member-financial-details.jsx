import { translateCurrency } from "@/utils/helpers";
import { InfoCard } from "./info-card";
import { CardView } from "./card-view";

export async function MemberFinancialDetails({ data }) {
  const currentLoan = data?.loans?.find(
    (loan) => loan.loanStatus !== "complete"
  );

  const financialData = [
    {
      icon: "money",
      dataKey: "বর্তমান একাউন্ট ব্যালান্স",
      dataValue: translateCurrency(data?.totalSaved),
    },
    {
      icon: "expense",
      dataKey: "বর্তমান ঋণের পরিমান",
      dataValue: translateCurrency(
        currentLoan?.repayAmount ? currentLoan?.repayAmount : 0
      ),
    },
  ];

  return (
    <section>
      <CardView>
        {financialData?.map((item, index) => (
          <InfoCard key={index} data={item} />
        ))}
      </CardView>
    </section>
  );
}
