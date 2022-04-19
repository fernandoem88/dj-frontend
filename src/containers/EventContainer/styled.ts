import styled from "styled-components";

export const Root = styled.div.attrs({
  "data-tbsc-name": "EventContainer--Root",
})<{}>`
  position: relative;
  padding-top: 40px;
  & h3 {
    font-size: 25px;
  }

  & p {
    margin: 10px 0;
  }
`;
Root.displayName = "EventContainerRoot";

export const Img = styled.div.attrs({
  "data-tbsc-name": "EventContainer--Img",
})<{}>`
  margin-bottom: 20px;
`;
Img.displayName = "EventContainerImg";

export const Controls = styled.div.attrs({
  "data-tbsc-name": "EventContainer--Controls",
})<{}>`
  position: absolute;
  right: 30px;
  top: 0;
`;
Controls.displayName = "EventContainerControls";

export const DeleteBtn = styled.a.attrs({
  "data-tbsc-name": "EventContainer--DeleteBtn",
})<{}>`
  margin-left: 20px;
  color: red;
`;
DeleteBtn.displayName = "EventContainerDeleteBtn";

export const Back = styled.a.attrs({
  "data-tbsc-name": "EventContainer--Back",
})<{}>`
  display: block;
  margin-top: 40px;
`;
Back.displayName = "EventContainerBack";
