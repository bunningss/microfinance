import { Container } from "@/components/container";
import { Navbar } from "@/components/navbars/navbar";
import { DashboardSidebar } from "@/components/sidebars/dashboard-sidebar";
import { getSession } from "@/utils/auth";

export default async function DashboardLayout({ children }) {
  const { error, payload } = await getSession();

  return (
    <>
      <Navbar isLoggedIn={!error} user={payload} />
      <Container>
        <div className="flex gap-2">
          <DashboardSidebar />
          <main className="w-full">{children}</main>
        </div>
      </Container>
    </>
  );
}
