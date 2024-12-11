import { Block } from "@/components/block";
import { EmptyItem } from "@/components/empty-item";
import { DateFilter } from "@/components/filters/date-filter";
import { WithdrawalTable } from "@/components/tables/withdrawal-table";
import { getData } from "@/utils/api-calls";

async function Withdrawals({ searchParams }) {
  const { date } = searchParams;
  const queryParams = new URLSearchParams({
    ...(date && { date }),
  }).toString();

  const { response } = await getData(`expenses/withdraw?${queryParams}`, 0);

  return (
    <>
      {response.payload?.length <= 0 && (
        <EmptyItem message="কোন তথ্য পাওয়া যায়নি" />
      )}
      {response.payload?.length > 0 && (
        <WithdrawalTable withdrawals={response.payload} />
      )}
    </>
  );
}

export default async function Page({ searchParams }) {
  return (
    <div className="space-y-4">
      <Block title="Withdrawals / টাকা উত্তলোন এর তালিকা" />
      <DateFilter />
      <Withdrawals searchParams={searchParams} />
    </div>
  );
}
