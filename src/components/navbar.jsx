"use client";
import { useDashboardSidebar } from "@/hooks/modal-controllers";
import { Button } from "./ui/button";

export function Navbar() {
  const sidebar = useDashboardSidebar();

  const handleDashboardSidebar = () => {
    if (sidebar.isOpen) {
      sidebar.onClose();
    } else {
      sidebar.onOpen();
    }
  };

  return (
    <nav className="p-2 h-16 sticky top-0 z-10 bg-background shadow-md">
      <div className="flex items-center justify-between h-full">
        <h1 className="h-12 w-12">LOGO</h1>
        <Button
          variant="ghost"
          size="icon"
          icon="menu"
          className="lg:hidden"
          onClick={handleDashboardSidebar}
        />
      </div>
    </nav>
  );
}
