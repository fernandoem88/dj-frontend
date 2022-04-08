import Link from "next/link";
import React from "react";
import Layout from "@src/components/Layout";

interface Props {}
const AboutPage: React.FC<Props> = (props) => {
  return (
    <Layout title="About Dj Events">
      <h1>About</h1>
      <p>this is an app to find the latest dj and other musical events</p>
      <p>Version: 1.0.0</p>
      <Link href="/">Home</Link>
    </Layout>
  );
};

export type AboutPageProps = Props;
export default React.memo(AboutPage);
