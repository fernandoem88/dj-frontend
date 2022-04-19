import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as sc from "./styled";

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
    <sc.EventSC>
      <sc.EventImg>
        <Image src={getImageSrc(event.image)} width="170" height="100" alt="" />
      </sc.EventImg>
      <sc.Info>
        <span>
          {formatDateStr(event.date)} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </sc.Info>
      <div>
        <Link href={`/events/${event.id}`}>
          <a className={"btn"}>Details</a>
        </Link>
      </div>
    </sc.EventSC>
  );
};
export type EventItemProps = Props;
export default React.memo(EventItem) as typeof EventItem;
