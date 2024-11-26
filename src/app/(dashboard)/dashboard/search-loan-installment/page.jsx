import { Block } from "@/components/block";
import { LoanDetails } from "@/components/loan-details";

export default function Page() {
  return (
    <div className="space-y-4">
      <Block title="search loan installment / ঋণের কিস্তি খুঁজুন" />
      <LoanDetails />
    </div>
  );
}
