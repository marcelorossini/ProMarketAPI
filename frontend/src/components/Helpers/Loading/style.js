import styled, { keyframes, css } from "styled-components";

const SpinnerAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const fadeIn = keyframes`
  0% {
      opacity: 0;
      display: block;
  }
  100% {
    opacity: 1;
    display: block;
    z-index: 900;
  }
`;

export const fadeOut = keyframes`
  0% {
      opacity: 1;
  }
  99% {
    display: none;
  }
  100% {
    opacity: 0;
    display: none;
    z-index: -900;
  }
`;

export const Container = styled.div`
  background: #ffffff90;
  user-select: none;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  ${({ active }) => {
    if (active === true)
      return css`
        animation: ${fadeIn} 0.2s forwards;
      `;
    else if (active === false)
      return css`
        animation: ${fadeOut} 0.2s forwards;
      `;
    else return "display: none;";
  }}
`;

export const Wrapper = styled.div`
  user-select: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    width: ${({ width }) => width || "64px"};
    margin: ${({ margin }) => margin || "12px"};
    animation: 1.5s linear ${SpinnerAnimation} infinite;
    color: var(--color-primary);
  }
`;
