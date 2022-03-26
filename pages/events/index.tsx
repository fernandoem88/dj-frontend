import React from "react";
import Layout from "@src/components/Layout";

interface Props {}
const Events: React.FC<Props> = (props) => {
  return <Layout>Events</Layout>;
};

export type EventsProps = Props;
export default React.memo(Events);
