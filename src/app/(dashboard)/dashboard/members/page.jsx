import { Block } from "@/components/block";
import { CardView } from "@/components/card-view";
import { MemberCard } from "@/components/cards/member-card";
import { MembersFilters } from "@/components/filters/members-filters";
import { PaginationControls } from "@/components/pagination-controls";
import { getData } from "@/utils/api-calls";
import { Suspense } from "react";

async function Members({ searchParams }) {
  // Pagination
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";
  const searchKey = searchParams["searchKey"];

  const queryString = new URLSearchParams({
    page,
    per_page,
    ...(searchKey && { searchKey }),
  }).toString();

  // Data fetching
  const res = await getData(`members?${queryString}`, 0);
  const members = res.response.payload;

  return (
    <>
      <MembersFilters />

      <CardView className="xl:grid-cols-2">
        {members?.map((member, index) => (
          <MemberCard key={index} data={member} />
        ))}
      </CardView>

      <PaginationControls
        isLastPage={res.response.isLastPage}
        totalPages={res.response.totalPages}
      />
    </>
  );
}

export default async function Page({ searchParams }) {
  return (
    <div className="space-y-4">
      <Block title="View members" />

      <Suspense fallback={<p>Loading...</p>}>
        <Members searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
