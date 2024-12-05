"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "./ui/button";
import { Logo } from "./logo";

export function PrintPad({ children }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div ref={contentRef} className="print:px-2 space-y-4">
      <Button onClick={reactToPrintFn} className="print:hidden">
        প্রিন্ট করুন
      </Button>
      <header className="p-2 border-b-4 border-green-700 bg-green-50 hidden print:block">
        <div className="flex justify-between items-center">
          <span>সঞ্চয়ই</span>
          <span className="text-green-700">বিসমিল্লাহির রাহমানির রাহিম</span>
          <span>সম্পদ</span>
        </div>
        {/* Company Information */}
        <div>
          <div className="flex items-center justify-between">
            <Logo className="h-36 w-36" />
            <span className="text-3xl text-green-700">
              স্বপ্নতরী শ্রমজীবী সমবায় সমিতি লিমিটেড
            </span>
          </div>
          <div className="text-lg text-center">
            <p>১৭৭৮, মদীনাবাগ, কদমতলী, ঢাকা - ১৩৬২</p>
            <p className="text-xl">মোবাইল: ০১৬৮০-৯০৯৯, অফিস: ০১৯৩৭-৯৮৪৫৫৫</p>
            <p className="text-green-700">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কতৃক নিবন্ধিত নং - ০০১৭০/২১
            </p>
          </div>
        </div>
      </header>
      <div>{children}</div>
    </div>
  );
}
