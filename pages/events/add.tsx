import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@src/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@styles/Form.module.css";
import { API_URL } from "@src/shared/config";
import { StrapiResponse } from "@src/types";

interface Props {}
const initialValues = {
  name: "",
  performers: "",
  venue: "",
  address: "",
  date: "",
  time: "",
  description: "",
};
const AddEventPage: React.FC<Props> = (props) => {
  const [values, setValues] = React.useState(initialValues);

  const router = useRouter();

  const handleSubmit = React.useCallback(
    async (e: any) => {
      e.preventDefault();
      const hasEmptyString = Object.values(values).some((v) => !v);
      if (hasEmptyString) {
        toast.error("please fill in all fields", { position: "bottom-right" });
        return;
      }

      const res = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: values }),
      });

      const evt: StrapiResponse<{
        id: string;
        attributes: any;
      }> = await res.json();

      if (!!evt.error) {
        toast.error(`${evt.error.status} Error: ${evt.error.message}`, {
          position: "bottom-right",
        });
        return;
      }
      router.push(`/events/${evt.data.id}`);
    },
    [values]
  );

  const handleChange = React.useCallback((e: any) => {
    setValues((v) => {
      return { ...v, [e.target.name]: e.target.value };
    });
  }, []);

  const createInput = React.useCallback(
    (key: keyof typeof initialValues, type: string = "text") => {
      const inputProps = {
        id: key,
        name: key,
        type,
        onChange: handleChange,
        value: values[key],
      };
      return (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          {key === "description" ? (
            <textarea {...inputProps} />
          ) : (
            <input {...inputProps} />
          )}
        </div>
      );
    },
    [handleChange, values]
  );

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {createInput("name")}
          {createInput("performers")}
          {createInput("venue")}
          {createInput("address")}
          {createInput("date", "date")}
          {createInput("time")}
          {createInput("description")}
        </div>
        <input className="btn" type="submit" value="Add Event" />
      </form>
    </Layout>
  );
};

export type AddEventPageProps = Props;
export default React.memo(AddEventPage);
