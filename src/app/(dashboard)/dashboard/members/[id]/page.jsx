import { Block } from "@/components/block";
import { MemberDetails } from "@/components/member-details";
import { AddNewSavings } from "@/components/modals/add-new-savings";
import { getData } from "@/utils/api-calls";

async function Member({ id }) {
  const { response } = await getData(`members/${id}`);

  return <MemberDetails data={response.payload} />;
}

export default async function Page({ params }) {
  return (
    <div className="space-y-4">
      <Block title="Member details" />
      {/* Modal Buttons for new Savings and Loans */}
      <div className="grid grid-cols-2 gap-2">
        <AddNewSavings />
        <AddNewSavings />
      </div>

      {/* Member information */}
      <Member id={params.id} />
    </div>
  );
}
