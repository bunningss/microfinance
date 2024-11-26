import { formatNumber } from "@/utils/helpers";
import { Heading } from "./heading";

export async function MemberFinancialDetails({ data }) {
  const currentLoan = data?.loans?.find(
    (loan) => loan.loanStatus !== "complete"
  );

  return (
    <section className="bg-secondary p-2 rounded-md">
      <Heading>সদস্যের আর্থিক বিবরণী</Heading>
      <div className="mt-4 leading-loose">
        <p>
          বর্তমানে জমা আছে: <b>{formatNumber(data?.totalSaved)}</b>
        </p>
        <p>
          বর্তমান ঋণের নাম: <b>{currentLoan?.loanName}</b>
        </p>
        <p>
          বর্তমানে ঋণ নেয়া আছে: <b>{formatNumber(currentLoan?.loanAmount)}</b>
        </p>
        <p>
          ঋণ পরিশোধ করবে: <b>{formatNumber(currentLoan?.repayAmount)}</b>
        </p>
        <p>
          ঋণ পরিশোধ করেছে: <b>{formatNumber(currentLoan?.amountPaid)}</b>
        </p>
        <p>
          ঋণ পরিশোধ বাকি আছে:{" "}
          <b>
            {formatNumber(currentLoan.repayAmount - currentLoan?.amountPaid)}
          </b>
        </p>
      </div>
    </section>
  );
}
