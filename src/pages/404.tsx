import React from "react";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "@src/components/Layout";
import styled from "styled-components";

export const Root = styled.div.attrs({
  "data-tbsc-name": "Pages--Root",
})<{}>`
  text-align: center;
  margin: 100px 0 100px;

  & h1 {
    font-size: 50px;
  }
`;
Root.displayName = "PagesRoot";

interface Props {}
const NotFoundPage: React.FC<Props> = (props) => {
  return (
    <Layout title="page not found">
      <Root>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/">Go back home</Link>
      </Root>
    </Layout>
  );
};
export type NotFoundPageProps = Props;
export default React.memo(NotFoundPage);
