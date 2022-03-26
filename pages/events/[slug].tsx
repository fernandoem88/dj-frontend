import React from "react";
import Layout from "@src/components/Layout";

interface Props {}
const EventPage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <h1>My Event</h1>
    </Layout>
  );
};
export type EventPageProps = Props;
export default React.memo(EventPage);
