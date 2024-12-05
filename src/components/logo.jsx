import logo from "@/assets/logo.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }) {
  return (
    <figure className={cn("relative w-10 h-10", className)}>
      <Image
        src={logo}
        alt="Shopnotori"
        fill
        className="object-contain"
        loading="eager"
        priority
      />
    </figure>
  );
}
