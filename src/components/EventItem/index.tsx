import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@styles/EventItem.module.css";

interface Props {
  event: any;
}
export const formatDateStr = (date: string) => {
  return new Date(date).toLocaleDateString("de-DE");
};
export enum ImgFormat {
  thumbnail = 0,
  small = 1,
  medium = 2,
  large = 3,
}

export const getImageSrc = (
  image: any,
  format: ImgFormat = ImgFormat.thumbnail
) => {
  if (!image?.formats) return "/images/event-default.png";

  const formatNames = Object.values(ImgFormat).filter((v) => isNaN(+v));
  const formatName = formatNames[format];

  return image.formats[formatName]?.url || "/images/event-default.png";
};
const EventItem: React.FC<Props> = ({ event }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image src={getImageSrc(event.image)} width="170" height="100" alt="" />
      </div>
      <div className={styles.info}>
        <span>
          {formatDateStr(event.date)} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.id}`}>
          <a className={"btn"}>Details</a>
        </Link>
      </div>
    </div>
  );
};
export type EventItemProps = Props;
export default React.memo(EventItem) as typeof EventItem;
