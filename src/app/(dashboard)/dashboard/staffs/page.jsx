import { Block } from "@/components/block";
import { CardView } from "@/components/card-view";
import { StaffCard } from "@/components/cards/staff-card";
import { Preloader } from "@/components/preloader";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function Staffs() {
  const res = await getData("staffs", 0);
  const staffs = res.response.payload;

  return (
    <CardView>
      {staffs?.map((staff, index) => (
        <StaffCard key={index} user={staff} />
      ))}
    </CardView>
  );
}

export default function Page() {
  return (
    <div className="space-y-4">
      <Block title="staff members" />
      <Suspense fallback={<Preloader />}>
        <Staffs />
      </Suspense>
    </div>
  );
}
