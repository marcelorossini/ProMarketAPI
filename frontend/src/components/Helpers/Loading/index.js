// NextJS
import { useRef } from "react";

// Helpers
import { SpinnerIos } from "@styled-icons/fluentui-system-filled";

// Styles
import { Container, Wrapper } from "./style";

const Loading = (props) => {
  const refLoading = useRef();

  return (
    <Container ref={refLoading} active={props.active || null}>
      <Wrapper {...props}>
        <SpinnerIos />
      </Wrapper>
    </Container>
  );
};
export default Loading;
