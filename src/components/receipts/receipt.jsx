"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";

export function Receipt({ children }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="space-y-4">
      <Button onClick={reactToPrintFn}>প্রিন্ট করুন</Button>

      <div
        className="border border-input rounded-sm px-1 print:mx-2"
        ref={contentRef}
      >
        <h2 className="text-center font-bold py-2 border-b border-input">
          স্বপ্নতরী শ্রমজীবী সমবায় সমিতি লিমিটেড
        </h2>
        <div className="my-2 space-y-2">{children}</div>
        <div className="p-2 border-t border-input">
          <p className="text-center">Software Developed By</p>
          <p className="text-center italic font-bold text-muted-foreground">
            {process.env.NEXT_PUBLIC_COMPANY_NAME}
          </p>
        </div>
      </div>
    </div>
  );
}
