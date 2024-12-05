import { Heading } from "../heading";

export function Section({ children, title, className }) {
  return (
    <section>
      {title && <Heading className={className}>{title}</Heading>}
      <div className="py-4 min-h-[40vh] flex justify-center items-center w-full">
        {children}
      </div>
    </section>
  );
}
