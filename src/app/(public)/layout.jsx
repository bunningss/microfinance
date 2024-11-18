import { PublicNavbar } from "@/components/navbars/public-navbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <PublicNavbar />
      <main>{children}</main>
    </>
  );
}
