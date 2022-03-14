/* eslint-disable react-hooks/exhaustive-deps */
// NextJS
import { useState, useEffect } from "react";
import { render } from "react-dom";

// Helpers
import { Button } from "../../../styles/form";

// Styles
import {
  Container,
  Wrapper,
  Header,
  Main,
  Footer,
  BackgroundClose,
  ButtonClose,
  Title,
  CloseIcon,
} from "./style";

const Alert = (props) => {
  // Props
  const { type, confirmAction, title, message, onClose } = props;

  // States
  const [active, setActive] = useState(null);

  // onLoad
  useEffect(() => {
    if (type) setActive(true);
  }, [props]);

  // onClose
  useEffect(() => {
    if (active !== false) return;
    if (onClose) onClose();
  }, [active]);

  return (
    <Container active={active}>
      <Wrapper active={active}>
        <Header>
          <Title>{title}</Title>
          <ButtonClose onClick={() => setActive(false)}>
            <CloseIcon />
          </ButtonClose>
        </Header>
        <Main dangerouslySetInnerHTML={{ __html: message }} />
        {type === "Confirm" && (
          <Footer>
            <Button danger onClick={() => setActive(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                confirmAction && confirmAction();
                setActive(false);
              }}
            >
              Confirmar
            </Button>
          </Footer>
        )}
      </Wrapper>
      <BackgroundClose onClick={() => setActive(false)} />
    </Container>
  );
};
export default Alert;

export const alertDialog = (props) => {
  let divAlertDialog = document.getElementById("alert-dialog");
  if (!divAlertDialog) {
    divAlertDialog = document.createElement("div");
    divAlertDialog.id = "alert-dialog";
    document.body.appendChild(divAlertDialog);
  }
  render(<Alert {...props} />, divAlertDialog);
};
