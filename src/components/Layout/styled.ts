import styled from "styled-components";

export const Root = styled.div.attrs({
  "data-tbsc-name": "Layout--Root",
})<{}>`
  margin: 60px auto;
  max-width: 960px;
  padding: 0 30px;
`;
Root.displayName = "LayoutRoot";
