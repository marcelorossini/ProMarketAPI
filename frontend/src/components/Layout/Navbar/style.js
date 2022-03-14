import styled from "styled-components";

export const Container = styled.div`
  grid-area: Navbar;
  height: 70px;
  width: 100%;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 3px;
  display: flex;
  padding: 0 24px;
  align-items: center;
  color: var(--color-text-primary);
  position: relative;
  z-index: 100;

  & svg {
    height: 18px;
    margin-right: 12px;
    color: var(--color-text-primary);
    cursor: pointer;
  }
`;

export const ButtonMenu = styled.button`
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;
