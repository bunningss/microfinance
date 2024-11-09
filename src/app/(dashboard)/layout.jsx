import { DashboardSidebar } from "@/components/sidebars/dashboard-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex gap-4">
      <DashboardSidebar />
      <main>{children}</main>
    </div>
  );
}
