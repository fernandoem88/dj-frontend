import React from "react";
import styles from "@styles/Footer.module.css";
import Link from "next/link";

interface Props {}
const Footer: React.FC<Props> = (props) => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ events {new Date().getFullYear()}</p>
      <p>
        <Link href="/about">About this project</Link>
      </p>
    </footer>
  );
};
export type FooterProps = Props;
export default React.memo(Footer);
