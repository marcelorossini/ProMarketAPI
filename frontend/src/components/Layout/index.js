import { useState } from "react";

// Componentes
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Loading from "../Helpers/Loading";

// Style
import { Container, Wrapper } from "./style";

const Layout = (props) => {
  // Variáveis auxiliares
  const { children } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToogleSidebar = (forceState = null) => {
    setSidebarOpen(forceState || !sidebarOpen);
  };

  return (
    <>
      <Container {...props}>
        <Navbar handleToogleSidebar={handleToogleSidebar} {...props} />
        <Sidebar open={sidebarOpen} handleToogleSidebar={handleToogleSidebar} />
        <Wrapper>{children}</Wrapper>
        <Loading active={props.loading} />
      </Container>
    </>
  );
};
export default Layout;
