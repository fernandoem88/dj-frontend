import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@src/components/Header";
import Footer from "@src/components/Footer";
import ShowCase from "@src/components/ShowCase";
import * as sc from "./styled";

interface Props {
  title?: string;
  keywords?: string;
  description?: string;
}
const defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find thelatest DJ and other musical events",
  keywords: "music, dj, edm",
};
const Layout: React.FC<Props> = (props) => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <div>
      <Head>
        <title>{props.title || defaultProps.title}</title>
        <meta
          name="description"
          content={props.description || defaultProps.description}
        />
        <meta
          name="keywords"
          content={props.keywords || defaultProps.keywords}
        />
      </Head>
      <Header />
      {isHome && <ShowCase />}
      <sc.Root>{props.children}</sc.Root>
      <Footer />
    </div>
  );
};

export type LayoutProps = Props;
export default React.memo(Layout) as typeof Layout;
