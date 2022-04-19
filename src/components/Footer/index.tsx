import React from "react";
import Link from "next/link";
import * as sc from "./styled";

interface Props {}
const Footer: React.FC<Props> = (props) => {
  return (
    <sc.Root>
      <p>Copyright &copy; DJ events {new Date().getFullYear()}</p>
      <p>
        <Link href="/about">About this project</Link>
      </p>
    </sc.Root>
  );
};
export type FooterProps = Props;
export default React.memo(Footer);
