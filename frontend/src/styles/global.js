import { createGlobalStyle, keyframes } from "styled-components";

export default createGlobalStyle`
:root {
  --color-primary: #163271;
  --color-primary-hover: #112b66;
  --color-secondary: #ea7d00;
  --color-secondary-hover: #d17000;
  --color-text-primary: #2a2a2a;
  --color-red-mild: #e74c3c;
  --color-red-error: #801616;
  --color-grey-light: rgba(0,0,0,.12);   
}   

html, body {
  margin: 0;
  padding: 0;
  height: 100%;  
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;        
  box-sizing: border-box;
  color: var(---color-text-primary);
}

ul {
  list-style: none;   
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

p {
  display: inline-block;
}
`;

export const animationSlideUp = keyframes`
0% {
  opacity: 0;
  transform: translateY(20px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

export const animationSlideLeft = keyframes`
0% {
  opacity: 0;
  transform: translateX(20px);
}
100% {
  opacity: 1;
  transform: translateX(0);
}
`;

export const animationSlideRight = keyframes`
0% {
  opacity: 0;
  transform: translateX(-20px);
}
100% {
  opacity: 1;
  transform: translateX(0);
}
`;
