import React from "react";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "@src/components/Layout";
import styles from "@styles/404.module.css";

interface Props {}
const NotFoundPage: React.FC<Props> = (props) => {
  return (
    <Layout title="page not found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/">Go back home</Link>
      </div>
    </Layout>
  );
};
export type NotFoundPageProps = Props;
export default React.memo(NotFoundPage);
