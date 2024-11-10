import { Block } from "@/components/block";
import { CardView } from "@/components/card-view";
import { MemberCard } from "@/components/cards/member-card";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function Members() {
  const res = await getData("members", 0);
  const members = res.response.payload;

  return (
    <CardView className="grid md:grid-cols-2">
      {members?.map((member, index) => (
        <MemberCard key={index} data={member} />
      ))}
    </CardView>
  );
}

export default async function Page() {
  return (
    <div className="space-y-4">
      <Block title="View members" />
      <Suspense fallback={<p>Loading...</p>}>
        <Members />
      </Suspense>
    </div>
  );
}
