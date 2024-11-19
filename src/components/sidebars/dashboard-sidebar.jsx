import { SidebarItem } from "./sidebar-item";
import { sidebarItems } from "@/lib/static";

export function DashboardSidebar() {
  return (
    <aside
      className={`hidden lg:block top-[64px] shadow-md bg-secondary min-w-[300px] h-[calc(theme(height.screen)-theme(gap.4)-56px)] p-2 rounded-md overflow-y-auto sticky`}
    >
      <div className="flex flex-col gap-2">
        {sidebarItems?.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </aside>
  );
}
