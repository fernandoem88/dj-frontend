import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@src/components/Layout";
import EventMap from "@src/components/EventMap";
import Link from "next/link";
import { API_URL } from "@src/shared/config";
import Image from "next/image";
import {
  getImageSrc,
  formatDateStr,
  ImgFormat,
} from "@src/components/EventItem";
import { StrapiResponse } from "@src/types";
import { useRouter } from "next/router";
import { useToken } from "@src/contexts/AuthContext";
import * as sc from "./styled";

interface Props {
  event: any;
}

const EventPage: React.FC<Props> = ({ event }) => {
  const router = useRouter();
  const token = useToken();
  const handleDelete = React.useCallback(async () => {
    if (!confirm("are you sure?")) {
      return;
    }
    const res = await fetch(`${API_URL}/api/events/${event.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { error }: StrapiResponse = await res.json();
    if (error) {
      toast.error(`${error.status} error: ${error.message}`);
      return;
    }
    router.push("/events");
  }, [event.id, token, router]);

  return (
    <Layout>
      <sc.Root>
        <sc.Controls>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <sc.DeleteBtn href="#" onClick={handleDelete}>
            Delete event
            <FaTimes />
          </sc.DeleteBtn>
        </sc.Controls>
        <h3>{event.name}</h3>
        <span>
          {formatDateStr(event.date)} ad {event.time}
        </span>

        <sc.Img>
          <Image
            src={getImageSrc(event.image, ImgFormat.small)}
            width={960}
            height={600}
            alt=""
          />
        </sc.Img>

        <h3>Performers:</h3>
        <p>{event.performers}</p>

        <h3>Description:</h3>
        <p>{event.description}</p>

        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <EventMap event={event} />

        <Link href="/events" passHref>
          <sc.Back>Go Back {"<"}</sc.Back>
        </Link>
      </sc.Root>
      <ToastContainer />
    </Layout>
  );
};

export type EventPageProps = Props;
export default React.memo(EventPage);
