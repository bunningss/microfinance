export function Heading({ title, subtitle }) {
  return (
    <header className="capitalize border-b">
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="text-sm">{subtitle}</span>
    </header>
  );
}
