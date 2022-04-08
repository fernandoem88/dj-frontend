import Link from "next/link";
import React from "react";
import Layout from "@src/components/Layout";

interface Props {}
const DashboardPage: React.FC<Props> = (props) => {
  return <Layout title="Dashboard">Dashboard</Layout>;
};

export type DashboardPageProps = Props;
export default React.memo(DashboardPage);
