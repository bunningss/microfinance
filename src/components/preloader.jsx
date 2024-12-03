import logo from "@/assets/logo.svg";
import Image from "next/image";

export function Preloader() {
  return (
    <div className="h-[calc(theme(height.screen)-theme(gap.4)-56px)] w-full flex justify-center items-center">
      <figure className="relative h-52 w-52">
        <Image src={logo} alt="" fill className="object-contain" />
      </figure>
    </div>
  );
}
