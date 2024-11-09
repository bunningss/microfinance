import { DashboardSidebar } from "@/components/sidebars/dashboard-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex p-2 gap-2">
      <DashboardSidebar />
      <main className="w-full">{children}</main>
    </div>
  );
}
