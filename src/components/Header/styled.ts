import styled from "styled-components";

export const Header = styled.header.attrs({
  "data-tbsc-name": "Header--Header",
})<{}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  color: #333;
  height: 60px;
  padding: 0 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  & a {
    color: #333;
    margin-right: 20px;
  }
  & a:hover {
    color: #000;
  }
  & ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;

    & ul {
      margin: 20px 0;
      flex-direction: column;
      text-align: center;
    }

    & a {
      margin-right: 0;
    }
  }
`;
Header.displayName = "HeaderHeader";

export const Logo = styled.div.attrs({
  "data-tbsc-name": "Header--Logo",
})<{}>`
  color: red;
  font-size: 20px;
  text-transform: uppercase;
  & a {
    color: red;
  }
  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;
Logo.displayName = "HeaderLogo";
