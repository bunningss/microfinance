"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GlobalError({ error, reset }) {
  const router = useRouter();

  return (
    <html>
      <body>
        <main className="h-screen w-screen flex justify-center items-center">
          <h2 className="text-xl md:text-3xl text-center">
            You do not have permission to view this page. Please contact
            administrator.
          </h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </main>
      </body>
    </html>
  );
}
