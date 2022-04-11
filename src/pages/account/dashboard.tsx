import Link from "next/link";
import React from "react";
import Layout from "@src/components/Layout";
import { parseCookies } from "@src/shared/helpers";
import { API_URL } from "@src/shared/config";
import qs from "qs";
import styled from "styled-components";
import DashboardEvent from "@src/components/DashboardEvent";

export const H1 = styled.h1.attrs({
  "data-tbsc-name": "Account--H1",
})<{}>`
  & span {
    font-size: 20px;
    color: #777;
    margin-left: 10px;
  }
`;
H1.displayName = "AccountH1";

export const H3 = styled.h3.attrs({
  "data-tbsc-name": "Account--H3",
})<{}>`
  font-size: 25px;
  color: red;
`;
H3.displayName = "AccountH3";

interface Props {
  events: any[];
}
const DashboardPage: React.FC<Props> = (props) => {
  React.useEffect(() => {
    console.log("...dashboard", props.events, props);
  }, []);

  const handleDelete = React.useCallback((eventId: string) => {
    // callback logic goes here
  }, []);

  return (
    <Layout title="User Dashboard">
      <div>
        <H1>Dashboard</H1>
        <H3>My Events</H3>
        {props.events.map((evt) => {
          return (
            <DashboardEvent
              key={evt.id}
              event={evt}
              handleDelete={() => handleDelete(evt.id)}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export type DashboardPageProps = Props;
export default React.memo(DashboardPage);

export const getServerSideProps = async (ctx) => {
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
};
