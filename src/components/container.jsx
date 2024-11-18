export function Container({ children }) {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1920px] w-full p-2">{children}</div>
    </div>
  );
}
