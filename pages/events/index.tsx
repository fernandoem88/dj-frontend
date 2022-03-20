import React from "react";

interface Props {}
const Events: React.FC<Props> = (props) => {
  return <div>Events</div>;
};
export type EventsProps = Props;
export default React.memo(Events);
