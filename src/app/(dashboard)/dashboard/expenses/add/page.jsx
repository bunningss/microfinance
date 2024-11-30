import { Block } from "@/components/block";
import { AddOtherExpense } from "@/components/modals/add-other-expense";
import { AddSalary } from "@/components/modals/add-salary";
import { WithdrawMoneyModal } from "@/components/modals/withdraw-money-modal";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function SalaryForm() {
  const { response } = await getData("staffs", 0);

  return <AddSalary staffs={response.payload} />;
}

export default function Page() {
  return (
    <div className="space-y-4">
      <Block title="add new expense" />
      <div className="grid grid-cols-2 gap-2">
        <Suspense fallback={<p>Loading...</p>}>
          <SalaryForm />
        </Suspense>
        <AddOtherExpense />
        <WithdrawMoneyModal />
      </div>
    </div>
  );
}
