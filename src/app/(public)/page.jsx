import { Container } from "@/components/container";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { TeamMembers } from "@/components/landing/team-members";

export default function Page() {
  return (
    <Container>
      <Hero />
      <TeamMembers />
      <TeamMembers />
      <Stats />
    </Container>
  );
}
