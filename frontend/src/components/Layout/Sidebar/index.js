import { useRouter } from "next/router";

// Style
import { Container, Username, Logo, List, Item, CloseButton } from "./style";
import { Home, ListUl } from "@styled-icons/boxicons-regular";
import { Close } from "@styled-icons/ionicons-outline";

const Sidebar = (props) => {
  // Variáveis auxiliares
  const { handleToogleSidebar } = props;
  const router = useRouter();

  return (
    <Container {...props}>
      <Username>Teste ProMarket</Username>
      <CloseButton onClick={() => handleToogleSidebar()}>
        <Close />
      </CloseButton>
      <List onClick={() => handleToogleSidebar(false)}>
        <Item onClick={() => router.push("/pesquisa")}>
          <Home /> Início
        </Item>
        <Item onClick={() => router.push("/cadastro/empresa")}>
          <ListUl /> Empresas
        </Item>
        <Item onClick={() => router.push("/cadastro/contatos")}>
          <ListUl /> Contatos
        </Item>
        <Item onClick={() => router.push("/cadastro/atividades")}>
          <ListUl /> Atividades
        </Item>
      </List>
      <Logo>
        <img src="/assets/logo.png" alt="logo" />
      </Logo>
    </Container>
  );
};
export default Sidebar;
