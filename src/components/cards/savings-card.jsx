import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { translateCurrency } from "@/utils/helpers";
import { PayInstallment } from "../modals/pay-installment";

export function SavingsCard({ data, installments }) {
  return (
    <Card title={data?.savingsName}>
      <CardContent className="p-1">
        <div className="py-0 px-1 w-full flex flex-col gap-1">
          <CardTitle className="capitalize text-base flex justify-between items-center">
            <span>
              {" "}
              সঞ্চয়ের নাম: <b>{data?.savingsName}</b>
            </span>
          </CardTitle>
          <span className="capitalize">
            সঞ্চয়ের স্থিতি:{" "}
            <b
              className={`${
                data?.savingsStatus === "complete"
                  ? "text-green-600"
                  : "text-destructive"
              }`}
            >
              {data?.savingsStatus}
            </b>
          </span>
          <span className="capitalize">
            সঞ্চয়ের ধরণ: <b>{data?.savingsType}</b>
          </span>
          <div className="flex items-center justify-between flex-wrap lg:flex-nowrap">
            <span className="capitalize">
              {data?.savingsType} সঞ্চয় পরিমাণ:{" "}
              <span className="text-primary font-bold uppercase">
                {translateCurrency(data?.savingsAmount)}
              </span>
            </span>
            <div className="space-x-2">
              {installments && (
                <PayInstallment installments={installments} type="savings" />
              )}
              <Link href={`/dashboard/members/savings/${data?._id}`}>
                <Button icon="view" size="icon" className="rounded-full" />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
