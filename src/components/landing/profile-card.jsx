import Image from "next/image";
import person from "@/assets/person.jpg";

export function ProfileCard() {
  return (
    <div className="text-center">
      <figure className="w-32 h-32 md:w-44 md:h-44 mx-auto mb-4 relative">
        <Image
          src={person}
          alt="Mr. John Doe"
          fill
          className="rounded-full object-cover"
        />
      </figure>
      <h3 className="font-medium text-xl md:text-2xl">Mr. John Doe</h3>
      <p className="text-base md:text-lg mb-4">Founder & CEO</p>
    </div>
  );
}
