import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export function MemberCard({ data }) {
  return (
    <Card title={data?.name} className="relative">
      <CardContent className="flex items-center gap-2 p-1 md:p-1">
        <figure className="relative h-[100px] w-[120px]">
          <Image
            src={data?.memberImage}
            alt={data?.name}
            fill
            quality={65}
            sizes="100px"
            className="object-contain"
          />
        </figure>
        <div className="py-0 px-1 w-full flex flex-col gap-1">
          <CardTitle className="capitalize font-bold text-base">
            {data?.name}
          </CardTitle>
          <div className="flex gap-2 text-xs md:text-sm lg:text-sm xl:text-base">
            <span>
              সদস্য নম্বর: <b>{data.memberNumber}</b>
            </span>
            <span>
              ফোন নম্বর: <b>{data.phone}</b>
            </span>
          </div>
          <div className="flex gap-2 text-xs md:text-sm lg:text-sm xl:text-base">
            <p>
              এলাকা: <b>{data?.currArea}</b>, গ্রাম: <b>{data?.currVillage}</b>,
              পোস্ট অফিস: <b>{data?.currPostOffice}</b>, থানা:{" "}
              <b>{data?.currPoliceStation}</b>
            </p>
          </div>
          <div className="absolute top-1 right-1 text-xs md:text-sm lg:text-sm xl:text-base">
            <Link href={`/dashboard/members/${data?.nidNumber}`} passHref>
              <Button size="icon" className="rounded-full" icon="view" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
