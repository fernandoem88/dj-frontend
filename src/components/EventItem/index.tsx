import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@styles/EventItem.module.css";

interface Props {
  event: any;
}
const EventItem: React.FC<Props> = ({ event }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={event.image ?? `/images/event-default.png`}
          width="170"
          height="100"
        />
      </div>
      <div className={styles.info}>
        <span>
          {event.date} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.slug}`}>
          <a className={"btn"}>Details</a>
        </Link>
      </div>
    </div>
  );
};
export type EventItemProps = Props;
export default React.memo(EventItem) as typeof EventItem;
