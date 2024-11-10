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
            sizes="100px"
            className="object-contain"
          />
        </figure>
        <div className="py-0 px-1 w-full flex flex-col gap-1">
          <CardTitle className="capitalize font-bold text-base">
            {data?.name}
          </CardTitle>
          <div className="flex gap-2">
            <span>
              Member No: <b>{data.nidNumber}</b>
            </span>
            <span>
              Mobile No: <b>{data.phone}</b>
            </span>
          </div>
          <div className="flex gap-2">
            <p>
              Area: <b>{data?.currArea}</b>,Village: <b>{data?.currVillage}</b>,
              Post Office: <b>{data?.currPostOffice}</b>, Police Station:{" "}
              <b>{data?.currPoliceStation}</b>
            </p>
          </div>
          <div className="absolute top-1 right-1">
            <Link href={`/dashboard/members/${data?.nidNumber}`} passHref>
              <Button size="icon" className="rounded-full" icon="view" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
