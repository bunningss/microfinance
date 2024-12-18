import Link from "next/link";
import { Block } from "@/components/block";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";
import { Preloader } from "@/components/preloader";
import { ViewSavings } from "@/components/modals/view-savings";
import { ViewLoans } from "@/components/modals/view-loans";
import { AddNewLoan } from "@/components/modals/add-new-loan";
import { WithdrawMoney } from "@/components/modals/withdraw-money";
import { MemberFinancialDetails } from "@/components/member-financial-details";
import { Button } from "@/components/ui/button";

async function Member({ id }) {
  const { response } = await getData(`members/${id}`, 0);

  return (
    <>
      {/* Modal Buttons for new Savings and Loans */}
      <div className="grid grid-cols-2 gap-2">
        <ViewSavings savings={response.payload?.savings} />
        <ViewLoans loans={response.payload?.loans} />
        <Link href={`/dashboard/members/${id}/add-savings`}>
          <Button icon="plus" className="w-full">
            নতুন সঞ্চয়
          </Button>
        </Link>
        <AddNewLoan member={response.payload} />
        <WithdrawMoney id={response.payload?._id} />
      </div>
      <MemberFinancialDetails data={response.payload} />
    </>
  );
}

export default async function Page({ params }) {
  return (
    <div className="space-y-4">
      <Block title="Member details / সদস্য তথ্য" />

      {/* Member information */}
      <Suspense fallback={<Preloader />}>
        <Member id={params.id} />
      </Suspense>
    </div>
  );
}
