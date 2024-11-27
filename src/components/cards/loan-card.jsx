import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { formatNumber } from "@/utils/helpers";
import { PayInstallment } from "../modals/pay-installment";

export function LoanCard({ data, installments }) {
  return (
    <Card title={data?.loanName}>
      <CardContent className="p-1">
        <div className="py-0 px-1 w-full flex flex-col gap-1">
          <CardTitle className="capitalize text-base flex justify-between items-center">
            <span>
              {" "}
              ঋণের নাম: <b>{data?.loanName}</b>
            </span>
          </CardTitle>
          <span className="capitalize">
            ঋণের স্থিতি:{" "}
            <b
              className={`${
                data?.loanStatus === "complete"
                  ? "text-green-600"
                  : "text-destructive"
              }`}
            >
              {data?.loanStatus}
            </b>
          </span>
          <span className="capitalize">
            ঋণ পরিশোধের ধরণ: <b>{data?.loanType}</b>
          </span>
          <span className="capitalize">
            ঋণের পরিমাণ: <b>{formatNumber(data?.loanAmount)}</b>
          </span>
          <span className="capitalize">
            পরিশোধ করবে:{" "}
            <b>
              {formatNumber(data?.repayAmount)} (+{data.rate}%)
            </b>
          </span>

          <div className="flex items-center justify-between flex-wrap lg:flex-nowrap">
            <span className="capitalize">
              {data?.loanType} পরিশোধ করবে:{" "}
              <span className="text-primary font-bold uppercase">
                {formatNumber(data?.installmentAmount)}
              </span>
            </span>
            <div className="space-x-2">
              {installments && (
                <PayInstallment installments={installments} type="loan" />
              )}
              <Link href={`/dashboard/members/loan/${data?._id}`}>
                <Button icon="view" size="icon" className="rounded-full" />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
