import { Block } from "@/components/block";
import { ExpensesTable } from "@/components/expenses-table";
import { Preloader } from "@/components/preloader";
import { PrintPad } from "@/components/print-pad";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function Expenses() {
  const { response } = await getData("expenses", 0);

  return <ExpensesTable expenses={response.payload} />;
}

export default function Page() {
  return (
    <div className="space-y-4">
      <Block title="view expenses" />
      <Suspense fallback={<Preloader />}>
        <PrintPad>
          <Expenses />
        </PrintPad>
      </Suspense>
    </div>
  );
}
