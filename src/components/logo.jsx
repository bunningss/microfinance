import logo from "@/assets/logo.png";
import Image from "next/image";

export function Logo() {
  return (
    <figure className="relative w-[150px] h-10">
      <Image src={logo} alt="Shopnotori" fill className="object-contain" />
    </figure>
  );
}
