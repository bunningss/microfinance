"use client";
import { useDashboardSidebar } from "@/hooks/modal-controllers";
import { Button } from "../ui/button";
import { Container } from "../container";
import { Logo } from "../logo";
import { logout } from "@/utils/auth";
import { useRouter } from "next/navigation";

export function Navbar({ isLoggedIn, user }) {
  const sidebar = useDashboardSidebar();
  const router = useRouter();

  const handleDashboardSidebar = () => {
    if (sidebar.isOpen) {
      sidebar.onClose();
    } else {
      sidebar.onOpen();
    }
  };

  return (
    <nav className="sticky top-0 z-10 bg-background dark:bg-secondary shadow-md print:hidden">
      <Container>
        <div className="flex items-center justify-between h-full">
          <Logo />
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <div className="hidden md:grid">
                <span>{user?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.role}
                </span>
              </div>
            )}
            {isLoggedIn && (
              <Button
                icon="logout"
                onClick={async () =>
                  await Promise.all([logout(), router.refresh()])
                }
              >
                Logout
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              icon={sidebar.isOpen ? "close" : "menu"}
              className="lg:hidden"
              onClick={handleDashboardSidebar}
            />
          </div>
        </div>
      </Container>
    </nav>
  );
}
