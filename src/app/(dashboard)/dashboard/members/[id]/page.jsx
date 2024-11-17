import { Block } from "@/components/block";
import { MemberDetails } from "@/components/member-details";
import { getData } from "@/utils/api-calls";

async function Member({ id }) {
  const { response } = await getData(`members/${id}`);

  return <MemberDetails data={response.payload} />;
}

export default async function Page({ params }) {
  return (
    <div className="space-y-4">
      <Block title="Member details" />

      {/* Member information */}
      <Member id={params.id} />
    </div>
  );
}
