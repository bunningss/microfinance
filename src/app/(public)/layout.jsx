import { PublicNavbar } from "@/components/navbars/public-navbar";
import { getSession } from "@/utils/auth";

export default async function PublicLayout({ children }) {
  const { error, payload } = await getSession();

  return (
    <>
      <PublicNavbar isLoggedIn={!error} user={payload} />
      <main>{children}</main>
    </>
  );
}
