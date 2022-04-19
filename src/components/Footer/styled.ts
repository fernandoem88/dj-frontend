import styled from "styled-components";

export const Root = styled.footer.attrs({
  "data-tbsc-name": "Footer--Root",
})<{}>`
  margin: 100px 0 40px;
  text-align: center;

  & p {
    margin: 5px 0;
  }
`;
Root.displayName = "FooterRoot";
