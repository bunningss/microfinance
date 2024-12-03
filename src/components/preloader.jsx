import { Logo } from "./logo";

export function Preloader() {
  return (
    <div className="h-[calc(theme(height.screen)-theme(gap.4)-56px)] w-full flex justify-center items-center">
      <Logo className="h-52 w-52" />
    </div>
  );
}
