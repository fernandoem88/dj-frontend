import React from "react";
import Layout from "@src/components/Layout";

interface Props {}
const AddEventPage: React.FC<Props> = (props) => {
  return <Layout title="Add New Event">AddEventPage</Layout>;
};

export type AddEventPageProps = Props;
export default React.memo(AddEventPage);
