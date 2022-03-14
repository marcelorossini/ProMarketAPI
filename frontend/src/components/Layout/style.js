import styled from "styled-components";
import { animationSlideLeft } from "../../styles/global";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 0px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: "Sidebar Navbar" "Sidebar Wrapper";
  @media (min-width: 768px) {
    grid-template-columns: 280px 1fr;
  }
`;

export const Wrapper = styled.div`
  grid-area: Wrapper;
  padding: 24px 24px;
  overflow-y: scroll;

  & > * {
    animation: ${animationSlideLeft} 0.4s ease;
  }
`;
