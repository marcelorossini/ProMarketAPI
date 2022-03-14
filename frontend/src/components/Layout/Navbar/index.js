import { useRouter } from "next/router";

// Style
import { Container, ButtonMenu } from "./style";
import { ArrowBack, Menu } from "@styled-icons/boxicons-regular";

const Navbar = (props) => {
  // Variáveis auxiliares
  const router = useRouter();
  const { title, handleToogleSidebar, backButton = true } = props;

  return (
    <Container>
      <ButtonMenu onClick={() => handleToogleSidebar()}>
        <Menu />
      </ButtonMenu>
      {backButton && <ArrowBack onClick={() => router.back()} />}
      {title || ""}
    </Container>
  );
};
export default Navbar;
