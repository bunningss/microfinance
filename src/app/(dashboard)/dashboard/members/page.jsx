import { Block } from "@/components/block";
import { CardView } from "@/components/card-view";
import { MemberCard } from "@/components/cards/member-card";
import { EmptyItem } from "@/components/empty-item";
import { MembersFilters } from "@/components/filters/members-filters";
import { PaginationControls } from "@/components/pagination-controls";
import { Preloader } from "@/components/preloader";
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
  const { error, response } = await getData(`members?${queryString}`, 0);
  const members = response.payload;

  if (error) throw new Error(response.msg);

  return (
    <>
      <MembersFilters />
      {members?.length <= 0 && <EmptyItem message="কোন তথ্য পাওয়া যায়নি" />}
      {members?.length > 0 && (
        <CardView className="xl:grid-cols-2">
          {members?.map((member, index) => (
            <MemberCard key={index} data={member} />
          ))}
        </CardView>
      )}
      <PaginationControls
        isLastPage={response?.isLastPage}
        totalPages={response?.totalPages}
      />
    </>
  );
}

export default async function Page({ searchParams }) {
  return (
    <div className="space-y-4">
      <Block title="View members" />

      <Suspense fallback={<Preloader />}>
        <Members searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
