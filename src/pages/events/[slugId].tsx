import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@src/components/Layout";
import EventMap from "@src/components/EventMap";
import styles from "@styles/Event.module.css";
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
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={handleDelete}>
            Delete event
            <FaTimes />
          </a>
        </div>
        <h3>{event.name}</h3>
        <span>
          {formatDateStr(event.date)} ad {event.time}
        </span>

        <div className={styles.image}>
          <Image
            src={getImageSrc(event.image, ImgFormat.small)}
            width={960}
            height={600}
            alt=""
          />
        </div>

        <h3>Performers:</h3>
        <p>{event.performers}</p>

        <h3>Description:</h3>
        <p>{event.description}</p>

        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <EventMap event={event} />

        <Link href="/events">
          <a className={styles.back}>Go Back {"<"}</a>
        </Link>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const { error, data }: StrapiResponse = await res.json();

  const paths = data.map((d) => {
    return { params: { slugId: String(d.id) } };
  });

  return { paths, fallback: false }; // false => it will show 404 if the path is not found
}

export async function getStaticProps({ params }: any) {
  const { slugId } = params;

  const res = await fetch(`${API_URL}/api/events/${slugId}?populate=*`);
  const { data } = await res.json();
  const event = {
    id: data.id,
    ...data.attributes,
    image: data.attributes.image?.data?.attributes || null,
  };

  const props = {
    event,
  };
  return { props, revalidate: 1 };
}

// export async function getServerSideProps({ query }: any) {
//   const { slug } = query;
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const [event] = await res.json();
//   const props = { event };
//   return { props };
// }

export type EventPageProps = Props;
export default React.memo(EventPage);
