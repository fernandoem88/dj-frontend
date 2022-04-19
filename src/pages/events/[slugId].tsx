import "react-toastify/dist/ReactToastify.css";

import { API_URL } from "@src/shared/config";
import { StrapiResponse } from "@src/types";
import EventContainer from "@src/containers/EventContainer";

export default EventContainer;

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
