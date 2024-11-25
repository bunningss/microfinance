import { Section } from "./section";
import {
  Users,
  CreditCard,
  Home,
  Heart,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export function Stats() {
  const stats = [
    { icon: Users, label: "Members", value: "1500+" },
    { icon: CreditCard, label: "Credit", value: "10532" },
    { icon: Users, label: "RMSD", value: "2305" },
    { icon: Home, label: "Housing", value: "45867" },
    { icon: Heart, label: "General Loan", value: "1091" },
    { icon: Briefcase, label: "SME Saving", value: "41866" },
    { icon: GraduationCap, label: "Educational Service", value: "3497" },
    { icon: CreditCard, label: "Mortgage Loan", value: "4153" },
    { icon: Heart, label: "Primary Credit", value: "4191" },
    { icon: Users, label: "Defaulter Current", value: "613" },
  ];

  return (
    <Section
      title="Our Product & Quantity"
      subtitle="we provide services to people of all social spectrum"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#ff4d4d]" />
            <div className="font-bold text-xl text-[#ff4d4d]">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
