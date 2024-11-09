import { SidebarItem } from "./sidebar-item";

const sidebarItems = [
  {
    label: "dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "Inventory",
    href: "",
    icon: "members",
    children: [
      {
        label: "view ",
        href: "members",
      },
      {
        label: "add ",
        href: "members/add",
      },
    ],
  },
  {
    label: "expenses",
    href: "",
    icon: "expense",
    children: [
      {
        label: "view expenses",
        href: "expenses",
        icon: "",
      },
      {
        label: "add expense",
        href: "expenses/add",
        icon: "",
      },
    ],
  },
  {
    label: "staffs",
    href: "",
    icon: "user",
    children: [
      {
        label: "view staffs",
        href: "staffs",
        icon: "",
      },
      {
        label: "add staff",
        href: "staffs/add",
        icon: "",
      },
    ],
  },
];

export function DashboardSidebar() {
  return (
    <aside className="bg-secondary min-w-[300px] h-[calc(theme(height.screen)-theme(gap.4))] p-2 rounded-md shadow-active overflow-y-auto sticky top-[calc(theme(gap.2))]">
      <>
        <div className="flex flex-col gap-2">
          {sidebarItems?.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </>
    </aside>
  );
}
