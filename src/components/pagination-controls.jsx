"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export function PaginationControls({ isLastPage, totalPages }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") ?? "1";

  const handleNextPage = () => {
    if (isLastPage) return;
    router.push(`?page=${Number(page) + 1}`);
  };

  const handlePrevPage = () => {
    if (Number(page) === 1) return;
    router.push(`?page=${Number(page) - 1}`);
  };

  return (
    <div className="flex items-center justify-end gap-4 print:hidden">
      <Button onClick={handlePrevPage} disabled={Number(page) === 1}>
        Previous
      </Button>
      <span>
        {page}/{totalPages}
      </span>
      <Button onClick={handleNextPage} disabled={isLastPage}>
        Next
      </Button>
    </div>
  );
}
