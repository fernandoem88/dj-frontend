import React from "react";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import Layout from "@src/components/Layout";
import AuthContext from "@src/contexts/AuthContext";
import styles from "@styles/AuthForm.module.css";

export default function LoginPage() {
  const [email, setEmail] = React.useState("john.do@gmail.com");
  const [password, setPassword] = React.useState("Pippo123");

  const ctx = React.useContext(AuthContext);

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
    [email, password]
  );

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
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
          Don't have an account? <Link href="/account/register">Register</Link>
        </p>
      </div>
      <ToastContainer />
    </Layout>
  );
}
