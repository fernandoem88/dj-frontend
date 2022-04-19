import styled from "styled-components";

export const Root = styled.div.attrs({
  "data-tbsc-name": "Search--Root",
})<{}>`
  & input {
    width: 250px;
    height: 35px;
    padding: 5px;
    border: 1px #777 solid;
  }
`;
Root.displayName = "SearchRoot";
