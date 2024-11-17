import Link from "next/link";
import { Icon } from "../icon";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export function SavingsCard({ data }) {
  return (
    <Card title={data?.savingsName}>
      <CardContent className="flex items-center gap-2 p-1 md:p-1">
        <div className="bg-slate-100 px-1">
          <Icon icon="money" size={80} />
        </div>
        <div className="py-0 px-1 w-full flex flex-col gap-1">
          <CardTitle className="capitalize text-base">
            সঞ্চয়ের নাম: <b>{data?.savingsName}</b>
          </CardTitle>
          <span className="capitalize">
            সঞ্চয়ের ধরণ: <b>{data?.savingsType}</b>
          </span>
          <div className="flex items-center justify-between">
            <span className="capitalize">
              {data?.savingsType} সঞ্চয় পরিমাণ:{" "}
              <span className="text-primary font-bold uppercase">
                ৳{data?.savingsAmount}
              </span>
            </span>
            <div className="space-x-2">
              <Link href="">
                <Button icon="view" size="icon" className="rounded-full" />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
