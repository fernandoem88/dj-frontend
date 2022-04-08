import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import React from "react";
import Search from "@src/components/Search";
import styles from "@styles/header.module.css";
import AuthContext from "@src/contexts/AuthContext";

interface Props {}
const Header: React.FC<Props> = (props) => {
  const authCtx = React.useContext(AuthContext);
  const { user, logout } = authCtx;
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          {!!user && (
            <>
              <li>
                <Link href="/events">
                  <a>Events</a>
                </Link>
              </li>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/account/login">
                  <a>
                    <FaSignOutAlt /> logout
                  </a>
                </Link>
              </li>
            </>
          )}

          {!user && (
            <li>
              <Link href="/account/login">
                <a className="btn-secondary btn-icon">
                  <FaSignInAlt /> Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
export type HeaderProps = Props;
export default React.memo(Header);
