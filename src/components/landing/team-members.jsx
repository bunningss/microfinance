import { ProfileCard } from "./profile-card";
import { Section } from "./section";

export function TeamMembers() {
  return (
    <Section title="Administration Members" subtitle="meet out administration">
      <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,_minmax(245px,_.5fr))] gap-2 md:gap-4 w-full">
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </Section>
  );
}
