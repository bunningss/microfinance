"use client";
import { useDashboardSidebar } from "@/hooks/modal-controllers";
import { SidebarItem } from "./sidebar-item";

const sidebarItems = [
  {
    label: "dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "members",
    href: "",
    icon: "members",
    children: [
      {
        label: "view members",
        href: "members",
      },
      {
        label: "add members",
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
        label: "salary statements",
        href: "expenses/salary-statements",
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
  const sidebar = useDashboardSidebar();

  return (
    <aside
      className={`z-10 border border-primary lg:border-0 absolute top-[72px] transition-all duration-300 ${
        sidebar.isOpen ? "-translate-x-0" : "-translate-x-[500px]"
      } lg:-translate-x-0  bg-secondary min-w-[300px] h-[calc(theme(height.screen)-theme(gap.4)-64px)] p-2 rounded-md shadow-active overflow-y-auto lg:sticky`}
    >
      <div className="flex flex-col gap-2">
        {sidebarItems?.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </aside>
  );
}
