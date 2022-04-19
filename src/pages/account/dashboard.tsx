import { parseCookies } from "@src/shared/helpers";
import qs from "qs";
import DashboardContainer from "@src/containers/DashboardContainer";
import { API_URL } from "@src/shared/config";

export default DashboardContainer;

export const getServerSideProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx.req);
    const query = qs.stringify(
      {
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );
    const res = await fetch(`${API_URL}/api/user-events?${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data, meta, error = null } = await res.json();

    const events = (data || []).map((d) => {
      return { id: d.id, ...d.attributes };
    });
    return { props: { events, error } };
  } catch (error) {
    return {
      props: {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        error: { message: error?.message || "something went wrong" },
      },
    };
  }
};
