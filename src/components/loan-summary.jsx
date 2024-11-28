import { translateCurrency, translateNumber } from "@/utils/helpers";
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

export function LoanSummary({ data }) {
  return (
    <section>
      <div>
        <Table>
          <TableCaption>
            <b>{data?.loanName}</b> ঋণের কিস্তিসমূহের তালিকা
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>সি. নং</TableHead>
              <TableHead>ঋণের নাম</TableHead>
              <TableHead>কিস্তির তারিখ</TableHead>
              <TableHead>কিস্তির পরিমান</TableHead>
              <TableHead className="text-center">
                কিস্তির বর্তমান অবস্থা
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.installments?.map((installment, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    {translateNumber(i + 1)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {data?.loanName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {new Date(installment?.date).toDateString()}
                  </TableCell>
                  <TableCell>
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
                  <TableCell>
                    <Link
                      href={`/dashboard/loan-installments/receipt/${installment?._id}`}
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
