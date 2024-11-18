import { Container } from "@/components/container";
import { Navbar } from "@/components/navbars/navbar";
import { DashboardSidebar } from "@/components/sidebars/dashboard-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container>
        <div className="flex gap-2">
          <DashboardSidebar />
          <main className="w-full">{children}</main>
        </div>
      </Container>
    </>
  );
}
