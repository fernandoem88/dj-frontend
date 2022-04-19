import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import React from "react";
import Search from "@src/components/Search";
import * as sc from "./styled";
import { useAuthContext } from "@src/contexts/AuthContext";

interface Props {}
const Header: React.FC<Props> = (props) => {
  const { user, logout } = useAuthContext();
  return (
    <sc.Header>
      <sc.Logo>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </sc.Logo>

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
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li onClick={logout}>
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
          <li>
            <Link href="/ant">
              <a>Ant</a>
            </Link>
          </li>
        </ul>
      </nav>
    </sc.Header>
  );
};
export type HeaderProps = Props;
export default React.memo(Header);
