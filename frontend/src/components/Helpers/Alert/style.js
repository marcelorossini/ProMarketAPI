import styled, { keyframes, css } from "styled-components";
import { animationSlideUp } from "../../../styles/global";

import { Close } from "@styled-icons/ionicons-outline";

export const fadeIn = keyframes`
  0% {
      opacity: 0;
      display: block;
  }
  100% {
    opacity: 1;
    display: block;
    z-index: 1100;
  }
`;

export const fadeOut = keyframes`
  0% {
      opacity: 1;
  }
  99% {
    z-index: 1100;
  }
  100% {
    opacity: 0;
    display: none;
    z-index: -1100;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(6px);
  background: #00000010;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ active }) => {
    if (active === true)
      return css`
        animation: ${fadeIn} 0.15s forwards;
      `;
    else if (active === false)
      return css`
        animation: ${fadeOut} 0.15s forwards;
      `;
    else return "display: none;";
  }}
`;

export const Wrapper = styled.div`
  width: 100%;
  margin: 24px;
  padding: 0 16px 16px 16px;
  max-width: 400px;
  background: #fff;
  box-shadow: 0px 0px 12px 6px #00000010;
  border-radius: 5px;
  position: relative;
  z-index: 1200;
  ${({ active }) =>
    active &&
    css`
      animation: ${animationSlideUp} 0.4s ease;
    `}
`;

export const Header = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-light);
`;

export const Main = styled.div`
  min-height: 40px;
  font-size: 14px;
  padding: 12px 0;
  text-align: center;
  color: var(--color-text-primary);
`;

export const Footer = styled.div`
  display: flex;
  width: calc(100% + 12px);
  margin: -12px 0 0 -12px;
  & > * {
    margin: 12px 0 0 12px !important;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  flex: auto;
  font-weight: bold;
  color: var(--color-primary);
  text-align: center;
`;

export const ButtonClose = styled.button`
  position: absolute;
  right: 0;
  padding: 12px;
`;

export const CloseIcon = styled(Close)`
  width: 32px;
  color: var(--color-primary);
`;

export const BackgroundClose = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1150;
`;
