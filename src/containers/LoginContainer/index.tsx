import React from "react";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import Layout from "@src/components/Layout";
import { useAuthContext } from "@src/contexts/AuthContext";
import * as sc from "./styled";

interface Props {}
const LoginContainer: React.FC<Props> = () => {
  const [email, setEmail] = React.useState("john.do@gmail.com");
  const [password, setPassword] = React.useState("Pippo123");

  const ctx = useAuthContext();

  const { login, error } = ctx;

  React.useEffect(() => {
    if (!error) return;
    toast.error(error);
  });

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      login({ email, password });
    },
    [login, email, password]
  );

  return (
    <Layout title="User Login">
      <sc.Root>
        <h1>
          <FaUser /> Log In
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Don&lsquo;t have an account?&nbsp;
          <Link href="/account/register">Register</Link>
        </p>
      </sc.Root>
      <ToastContainer />
    </Layout>
  );
};

export default React.memo(LoginContainer);
