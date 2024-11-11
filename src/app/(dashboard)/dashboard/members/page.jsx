import { Block } from "@/components/block";
import { CardView } from "@/components/card-view";
import { MemberCard } from "@/components/cards/member-card";
import { PaginationControls } from "@/components/pagination-controls";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function Members({ searchParams }) {
  // Pagination
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  // Data fetching
  const res = await getData(`members?page=${page}&per_page=${per_page}`, 0);
  const members = res.response.payload;

  return (
    <CardView className="grid md:grid-cols-2">
      {members?.map((member, index) => (
        <MemberCard key={index} data={member} />
      ))}
    </CardView>
  );
}

export default async function Page({ searchParams }) {
  return (
    <div className="space-y-4">
      <Block title="View members" />
      <Suspense fallback={<p>Loading...</p>}>
        <Members searchParams={searchParams} />
      </Suspense>
      <PaginationControls />
    </div>
  );
}
