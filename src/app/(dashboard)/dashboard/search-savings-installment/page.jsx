import { Block } from "@/components/block";
import { SavingsDetails } from "@/components/savings-details";

export default function Page() {
  return (
    <div className="space-y-4">
      <Block title="savings installment" />
      <SavingsDetails />
    </div>
  );
}
