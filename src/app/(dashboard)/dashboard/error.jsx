"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4">
      <h2 className="text-xl md:text-3xl">
        দুঃখিত, আপনার এই তথ্য দেখার অনুমতি নেই। দয়া করে অ্যাডমিনের সাথে যোগাযোগ
        করুন।
      </h2>
      <Button icon="arrowLeft" onClick={() => router.back()}>
        Go back
      </Button>
    </div>
  );
}
