"use client";
import { useDashboardSidebar } from "@/hooks/modal-controllers";
import { Sidebar } from "./sidebar";
import { SidebarItem } from "./sidebar-item";
import { sidebarItems } from "@/lib/static";

export function MobileDashboardSidebar({ title, subtitle }) {
  const { isOpen, onClose } = useDashboardSidebar();

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
    >
      <div className="flex flex-col gap-2">
        {sidebarItems?.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </Sidebar>
  );
}
