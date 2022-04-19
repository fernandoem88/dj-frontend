import styled from "styled-components";

export const Root = styled.div.attrs({
  "data-tbsc-name": "ShowCase--Root",
})<{}>`
  height: 300px;
  width: 100%;
  background: #000 url("/images/showcase.jpg") no-repeat center center;
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  & * {
    z-index: 20;
  }
  & h1 {
    font-size: 40px;
    margin-bottom: 0;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
Root.displayName = "ShowCaseRoot";
