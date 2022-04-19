import React from "react";
import Layout from "@src/components/Layout";
import { API_URL } from "@src/shared/config";

import DashboardEvent from "@src/components/DashboardEvent";
import { useToken } from "@src/contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import * as sc from "./styled";

interface Props {
  events: any[];
}
const DashboardPage: React.FC<Props> = (props) => {
  const token = useToken();
  const router = useRouter();
  const handleDelete = React.useCallback(
    async (eventId: string) => {
      try {
        const res = await fetch(`${API_URL}/api/events/${eventId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          router.reload();
          toast.success(`event ${eventId} deleted successfully!`);
        } else {
          toast.error(`${res.status} error: ${res.statusText}`);
        }
      } catch (error) {
        toast.error(`500 error: ${error?.message || "something went wrong"}`);
      }
    },
    [token, router]
  );

  return (
    <Layout title="User Dashboard">
      <div>
        <sc.H1>Dashboard</sc.H1>
        <sc.H3>My Events</sc.H3>
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
      <ToastContainer />
    </Layout>
  );
};

export type DashboardPageProps = Props;
export default React.memo(DashboardPage);
