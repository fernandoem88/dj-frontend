import Link from "next/link";
import Layout from "@src/components/Layout";
// import styles from "../styles/Home.module.css";

export default function HomePage() {
  return (
    <Layout>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </Layout>
  );
}
