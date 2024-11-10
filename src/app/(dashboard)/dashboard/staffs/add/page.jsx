import { Block } from "@/components/block";
import { AddStaff } from "@/components/forms/add-staff";

export default function Page() {
  return (
    <div className="space-y-4">
      <Block title="add new staff" />
      <AddStaff />
    </div>
  );
}
