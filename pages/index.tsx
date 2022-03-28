import Link from "next/link";
import Layout from "@src/components/Layout";
import EventItem from "@src/components/EventItem";
import { API_URL } from "@src/shared/config";

interface Props {
  events: Array<{ id: string; slug: string; name: string }>;
}
export default function HomePage({ events }: Props) {
  const hasEvents = events.length > 0;
  return (
    <Layout>
      <h1>Events</h1>
      {!hasEvents && <h3>No events to show</h3>}
      {events.map((evt) => {
        return (
          <EventItem key={evt.id} event={evt}>
            {evt.name}
          </EventItem>
        );
      })}
      {hasEvents && (
        <Link href="/events">
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  // getServerSideProps
  const res = await fetch(API_URL + "/api/events");
  const events = await res.json();
  // this is in the server
  return {
    props: { events },
    revalidate: 1, // reload after 1 sec everytime data changes
  };
}
