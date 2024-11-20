"use client";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="h-screen w-screen flex justify-center items-center">
          <h2 className="text-xl md:text-3xl text-center">
            You do not have permission to view this page. Please contact
            administrator.
          </h2>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </body>
    </html>
  );
}
