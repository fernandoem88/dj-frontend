import Link from "next/link";
import React from "react";
import styles from "@styles/header.module.css";

interface Props {}
const Header: React.FC<Props> = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export type HeaderProps = Props;
export default React.memo(Header);
