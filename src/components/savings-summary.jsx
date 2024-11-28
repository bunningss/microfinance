import {
  translateCurrency,
  translateDate,
  translateNumber,
} from "@/utils/helpers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Icon } from "./icon";
import Link from "next/link";

export function SavingsSummary({ data }) {
  return (
    <section>
      <div>
        <Table>
          <TableCaption>
            <b>{data?.savingsName}</b> সঞ্চয়ের কিস্তিসমূহের তালিকা
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">সি. নং</TableHead>
              <TableHead className="text-center">সঞ্চয়ের নাম</TableHead>
              <TableHead className="text-center">কিস্তির তারিখ</TableHead>
              <TableHead className="text-center">কিস্তির পরিমান</TableHead>
              <TableHead className="text-center">
                কিস্তির বর্তমান অবস্থা
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.installments?.map((installment, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="text-center">
                    {translateNumber(i + 1)}
                  </TableCell>
                  <TableCell className="text-center">
                    {data?.savingsName}
                  </TableCell>
                  <TableCell className="text-center">
                    {translateDate(installment?.date)}
                  </TableCell>
                  <TableCell className="text-center">
                    {translateCurrency(installment?.amount)}
                  </TableCell>
                  <TableCell
                    className={`flex justify-center ${
                      installment?.status === "paid"
                        ? "text-green-800"
                        : "text-destructive"
                    }`}
                  >
                    <Icon
                      icon={installment?.status === "paid" ? "done" : "close"}
                    />
                  </TableCell>
                  <TableCell className="text-center print:hidden">
                    <Link
                      className="underline text-cyan-800 font-bold"
                      href={`/dashboard/savings-installments/receipt/${installment?._id}`}
                    >
                      details
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
