import { Container } from "../container";
import { Logo } from "../logo";
import { Button } from "../ui/button";

export function PublicNavbar() {
  return (
    <nav className="shadow-md">
      <Container>
        <div className="flex justify-between">
          <Logo />
          <Button>Login</Button>
        </div>
      </Container>
    </nav>
  );
}
