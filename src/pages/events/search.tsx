import React from "react";
import { API_URL } from "@src/shared/config";
import Layout from "@src/components/Layout";
import EventItem from "@src/components/EventItem";
import Link from "next/link";
import qs from "qs";
import { useRouter } from "next/router";

interface Props {
  events: Array<{ id: string; slug: string; name: string }>;
}

function SearchPage({ events }: Props) {
  const hasEvents = events.length > 0;
  const router = useRouter();
  return (
    <Layout>
      <h1>Search result for {router.query.term}</h1>
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

export async function getServerSideProps({ query }) {
  // getServerSideProps

  const queryString = qs.stringify(
    {
      populate: "*",
      filters: {
        $or: ["name", "performers", "description", "venue"].map((k) => ({
          [k]: {
            $contains: query.term,
          },
        })),
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(API_URL + "/api/events?" + queryString);
  const events = (await res.json()).data.map((d) => {
    return {
      id: d.id,
      ...d.attributes,
      image: d.attributes.image?.data.attributes || null,
    };
  });
  // this is in the server
  return {
    props: { events },
    // revalidate: 1, // reload after 1 sec everytime data changes
  };
}

export type SearchPageProps = Props;
export default React.memo(SearchPage);
