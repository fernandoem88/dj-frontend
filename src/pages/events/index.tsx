import Link from "next/link";
import qs from "qs";
import Layout from "@src/components/Layout";
import EventItem from "@src/components/EventItem";
import { API_URL, PAGE_SIZE } from "@src/shared/config";
import { StrapiResponse } from "@src/types";
import Pagination from "@src/components/Pagination";

interface Props {
  events: Array<{ id: string; slug: string; name: string }>;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
export default function EventsPage({ events, pagination }: Props) {
  const hasEvents = events.length > 0;
  return (
    <Layout>
      <h1>Events</h1>

      {events.map((evt) => {
        return (
          <EventItem key={evt.id} event={evt}>
            {evt.name}
          </EventItem>
        );
      })}
      {!hasEvents && <h3>No events to show</h3>}
      <Pagination page={pagination.page} total={pagination.total} />
    </Layout>
  );
}

export async function getServerSideProps(urlParams) {
  const { query } = urlParams;
  const page = +(query.page || 1);

  const queryString = qs.stringify(
    {
      populate: "*",
      filters: {
        $where: {},
      },
      sort: ["date:asc"],
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        withCount: true,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(API_URL + "/api/events?" + queryString);
  const { data, meta }: StrapiResponse = await res.json();
  const events = data.map((d) => {
    return {
      id: d.id,
      ...d.attributes,
      image: d.attributes.image?.data?.attributes || null,
    };
  });

  const { pagination } = meta;

  // this is in the server
  return {
    props: { events, pagination },
    // revalidate: 1, // reload after 1 sec everytime data changes in case of getStaticProps
  };
}
