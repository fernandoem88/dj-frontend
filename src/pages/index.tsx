import React from "react";
import qs from "qs";
import EventItem from "@src/components/EventItem";
import Layout from "@src/components/Layout";
import Link from "next/link";
import { API_URL } from "@src/shared/config";

// export default function HomePage() {
//   const router = useRouter();
//   React.useEffect(() => {
//     const [, params] = router.asPath.split("?");
//     const qp = params ? "?" + params : "";
//     router.replace("/events" + qp);
//   }, []);
//   return null;
// }

export default function HomePage({ events, error }) {
  const msg = error || "No events to show";
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>{msg}</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} event={evt} />
      ))}

      {!error && events.length > 0 && (
        <Link href="/events?page=1">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const queryString = qs.stringify(
    {
      populate: "*",
      filters: {
        $where: {},
      },
      sort: ["date:asc"],
      pagination: {
        start: 0,
        limit: 2,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  try {
    const res = await fetch(`${API_URL}/api/events?${queryString}`);
    const events = (await res.json()).data.map((d) => {
      return {
        id: d.id,
        ...d.attributes,
        image: d.attributes.image?.data?.attributes || null,
      };
    });

    return {
      props: { events },
      revalidate: 1,
    };
  } catch (error) {
    return {
      // redirect: {
      //   permanent: false,
      //   destination: "/ant",
      //   props: { events: [], error: error?.messgage || "something went wrong" },
      // },
      props: { events: [], error: error?.messgage || "something went wrong" },
      revalidate: 1,
    };
  }
}
