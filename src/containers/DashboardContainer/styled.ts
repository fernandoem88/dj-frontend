import styled from "styled-components";

export const H1 = styled.h1.attrs({
  "data-tbsc-name": "Account--H1",
})<{}>`
  & span {
    font-size: 20px;
    color: #777;
    margin-left: 10px;
  }
`;
H1.displayName = "AccountH1";

export const H3 = styled.h3.attrs({
  "data-tbsc-name": "Account--H3",
})<{}>`
  font-size: 25px;
  color: red;
`;
H3.displayName = "AccountH3";
