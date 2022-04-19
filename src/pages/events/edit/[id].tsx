import EditEventContainer, {
  EditEventContainerProps,
} from "@src/containers/EditEventContainer";
import { API_URL } from "@src/shared/config";

export default EditEventContainer;

export async function getServerSideProps({ params, req }: any) {
  const { id } = params;

  try {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
    const { data } = await res.json();
    const image = data.attributes.image?.data?.attributes || null;

    const event = {
      id: data?.id,
      ...data.attributes,
      image,
      imageId: data.attributes.image?.data?.id || null,
    };

    const props: EditEventContainerProps = {
      event,
    };
    return {
      props,
      // revalidate: 1
    };
  } catch (error) {
    console.log("error", error.message);
    return {
      redirect: { destination: "/account/login", permanent: false },
      props: { error: error?.message || "something went wrong", event: {} },
    };
  }
}
