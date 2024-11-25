import { Heading } from "./heading";

export function Section({ children, title, subtitle }) {
  return (
    <section>
      {(title || subtitle) && <Heading title={title} subtitle={subtitle} />}
      <div className="py-4 min-h-[40vh] flex justify-center items-center w-full">
        {children}
      </div>
    </section>
  );
}
