import React from "react";

interface Props {}
const EventPage: React.FC<Props> = (props) => {
  return <div>EventPage</div>;
};
export type EventPageProps = Props;
export default React.memo(EventPage);
