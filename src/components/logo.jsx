import logo from "@/assets/logo.svg";
import Image from "next/image";

export function Logo() {
  return (
    <figure className="relative w-10 h-10">
      <Image src={logo} alt="Shopnotori" fill className="object-contain" />
    </figure>
  );
}
