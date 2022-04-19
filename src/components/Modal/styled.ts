import styled from "styled-components";

export const Root = styled.div.attrs({
  "data-tbsc-name": "Modal--Root",
})<{}>`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 20px;
  z-index: 100;
`;
Root.displayName = "ModalRoot";

export const Header = styled.div.attrs({
  "data-tbsc-name": "Modal--Header",
})<{}>`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;
Header.displayName = "ModalHeader";

export const Body = styled.div.attrs({
  "data-tbsc-name": "Modal--Body",
})<{}>`
  padding-top: 10px;
`;
Body.displayName = "ModalBody";

export const Overlay = styled.div.attrs({
  "data-tbsc-name": "Modal--Overlay",
})<{}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;
Overlay.displayName = "ModalOverlay";
