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
      <div className="border-b">
        <Logo />
        <div></div>
      </div>
      <Button onClick={reactToPrintFn}>Print Data</Button>
      <div>{children}</div>
    </div>
  );
}
