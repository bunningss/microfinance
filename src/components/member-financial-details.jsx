import { formatNumber } from "@/utils/helpers";
import { Heading } from "./heading";
import { EmptyItem } from "./empty-item";

export async function MemberFinancialDetails({ data }) {
  const currentLoan = data?.loans?.find(
    (loan) => loan.loanStatus !== "complete"
  );

  const currentSaving = data.savings.find(
    (saving) => saving.savingsStatus !== "complete"
  );

  return (
    <section className="bg-secondary p-2 rounded-md grid md:grid-cols-2 gap-4 md:gap-2 capitalize">
      <div className="border p-2 rounded-md">
        <Heading className="underline decoration-wavy">
          সঞ্চয় সম্পর্কিত তথ্য
        </Heading>
        {currentSaving && (
          <div className="mt-4 leading-loose">
            <p>
              সঞ্চয়ের নাম: <b>{currentSaving?.savingsName}</b>
            </p>
            <p>
              সঞ্চয়ের ধরণ: <b>{currentSaving?.savingsType}</b>
            </p>
            <p>
              কিস্তির টাকার পরিমান:{" "}
              <b>{formatNumber(currentSaving?.savingsAmount)}</b>
            </p>
            <p>
              সঞ্চয় সময়কাল: <b>{currentSaving?.savingsDuration} মাস</b>
            </p>
            <p>
              সঞ্চয় শুরুর তারিখ:{" "}
              <b>{new Date(currentSaving?.startDate).toDateString()}</b>
            </p>
            <p>
              সঞ্চয় শেষের তারিখ:{" "}
              <b>{new Date(currentSaving?.endDate).toDateString()}</b>
            </p>
            <p>
              মোট কিস্তির সংখ্যা: <b>{currentSaving?.installments?.length}</b>
            </p>
          </div>
        )}
        {!currentSaving && (
          <EmptyItem message="ঋণ সম্পর্কিত কোনো তথ্য পাওয়া যায়নি" />
        )}
      </div>

      <div className="border p-2 rounded-md">
        <Heading className="underline decoration-wavy">
          ঋণ সম্পর্কিত তথ্য
        </Heading>
        {currentLoan && (
          <div className="mt-4 leading-loose">
            <p>
              বর্তমানে জমা আছে: <b>{formatNumber(data?.totalSaved)}</b>
            </p>
            <p>
              বর্তমান ঋণের নাম: <b>{currentLoan?.loanName}</b>
            </p>
            <p>
              বর্তমানে ঋণ নেয়া আছে:{" "}
              <b>{formatNumber(currentLoan?.loanAmount)}</b>
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
                {formatNumber(
                  currentLoan?.repayAmount - currentLoan?.amountPaid
                )}
              </b>
            </p>
          </div>
        )}
        {!currentLoan && (
          <EmptyItem message="ঋণ সম্পর্কিত কোনো তথ্য পাওয়া যায়নি" />
        )}
      </div>
    </section>
  );
}
