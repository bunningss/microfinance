import { Block } from "@/components/block";
import { AddMember } from "@/components/forms/add-member";

export default async function Page() {
  return (
    <div className="space-y-4">
      <Block title="add new member"></Block>
      <AddMember />
    </div>
  );
}
