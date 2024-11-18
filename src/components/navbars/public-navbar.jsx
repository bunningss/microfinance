"use client";
import Link from "next/link";
import { Container } from "../container";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import { logout } from "@/utils/auth";
import { useRouter } from "next/navigation";

export function PublicNavbar({ isLoggedIn, user }) {
  const router = useRouter();

  return (
    <nav className="shadow-md">
      <Container>
        <div className="flex justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            {!isLoggedIn && (
              <Link href="/sign-in" passHref>
                <Button icon="login">Login</Button>
              </Link>
            )}
            {isLoggedIn && (
              <div className="hidden md:grid">
                <span>{user?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.role}
                </span>
              </div>
            )}
            {isLoggedIn && user?.role !== "user" && (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
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
          </div>
        </div>
      </Container>
    </nav>
  );
}
