import { Block } from "@/components/block";
import { SalaryFilters } from "@/components/filters/salary-filters";
import { PaginationControls } from "@/components/pagination-controls";
import { SalaryTable } from "@/components/salary-table";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function Salaries() {
  const res = await getData("expenses/salary", 0);
  const salaries = res.response.payload;

  return <SalaryTable salaries={salaries} />;
}

export default function Page() {
  return (
    <div className="space-y-4">
      <Block title="salary statements" />
      <Suspense fallback={<p>Loading...</p>}>
        <SalaryFilters />
        <Salaries />
      </Suspense>
      <PaginationControls />
    </div>
  );
}
