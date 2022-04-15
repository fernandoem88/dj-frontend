import Link from "next/link";
import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import * as sc from "./styled";

interface Props {
  event: any;
  handleDelete: () => void;
}
export const DashboradEvent: React.FC<Props> = ({ event, handleDelete }) => {
  return (
    <sc.Event>
      <sc.EventH4>
        <Link href={`/events/${event.id}`} passHref>
          <a>{event.name}</a>
        </Link>
      </sc.EventH4>
      <Link href={`/events/edit/${event.id}`} passHref>
        <sc.Btn>
          <FaPencilAlt /> <span>Edit event</span>
        </sc.Btn>
      </Link>
      <Link href="#" passHref>
        <sc.BtnDelete href="#" onClick={handleDelete}>
          <FaTrash /> <span>Delete event</span>
        </sc.BtnDelete>
      </Link>
    </sc.Event>
  );
};
export type DashboradEventProps = Props;
export default React.memo(DashboradEvent);
