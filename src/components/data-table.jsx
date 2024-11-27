"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";

export function DataTable({ columns, data, printable = false }) {
  const contentRef = React.useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div>
      {printable && (
        <Button onClick={reactToPrintFn} className="mb-4">
          Print Data
        </Button>
      )}
      <div ref={contentRef} className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.header} className="text-center">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="text-center even:bg-muted">
                {columns.map((column) => (
                  <TableCell key={column.header}>
                    {column.cell
                      ? column.cell(row, rowIndex)
                      : getNestedValue(row, column.accessorKey)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
