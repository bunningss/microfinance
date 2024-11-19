"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "./ui/button";

export function SalaryTable({ salaries }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <Button onClick={reactToPrintFn}>Print Data</Button>
      <table
        className="w-full rounded-md border border-primary md:border-secondary text-xs md:text-base"
        ref={contentRef}
      >
        <thead>
          <tr className="text-center bg-input">
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              SN
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              কর্মচারীর নাম
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              মাস
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              তারিখ
            </th>
            <th
              scope="col"
              className="p-2 border-r border-primary md:border-secondary"
            >
              বেতন
            </th>
            <th scope="col" className="p-2 md:border-0">
              প্রদানকারীর নাম
            </th>
          </tr>
        </thead>
        <tbody>
          {salaries?.map((salary, index) => (
            <tr key={index} className="text-center even:bg-secondary">
              <td className="p-2 border-r border-primary md:border-secondary">
                {index + 1}
              </td>
              <th
                scope="row"
                className="p-2 border-r border-primary md:border-secondary"
              >
                {salary.staff?.name}
              </th>
              <td className="p-2 border-r border-primary md:border-secondary">
                {salary?.month}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                {new Date(salary.createdAt).toDateString()}
              </td>
              <td className="p-2 border-r border-primary md:border-secondary">
                ৳{salary.amount}
              </td>
              <td className="p-2 md:border-0">{salary.addedBy?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
