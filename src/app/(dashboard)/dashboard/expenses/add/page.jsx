import { Block } from "@/components/block";
import { AddSalary } from "@/components/modals/add-salary";
import { Button } from "@/components/ui/button";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function SalaryForm() {
  const res = await getData("staffs", 0);

  return <AddSalary staffs={res.response.payload} />;
}

export default function Page() {
  return (
    <div className="space-y-4">
      <Block title="add new expense" />
      <div className="grid grid-cols-2 gap-2">
        <Suspense fallback={<p>Loading...</p>}>
          <SalaryForm />
        </Suspense>
        <Button>Other</Button>
      </div>
    </div>
  );
}
