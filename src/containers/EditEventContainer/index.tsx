import React from "react";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "@src/components/ImageUpload";
import Layout from "@src/components/Layout";
import Modal from "@src/components/Modal";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { API_URL } from "@src/shared/config";
import { StrapiResponse } from "@src/types";
import { getImageSrc } from "@src/components/EventItem";
import { useToken } from "@src/contexts/AuthContext";

import * as sc from "./styled";

interface Props {
  error?: string;
  event: {
    id: string;
    name: string;
    performers: string;
    venue: string;
    address: string;
    date: string;
    time: string;
    description: string;
    image?: any;
    imageId?: string;
  };
}

const EditEventContainer: React.FC<Props> = (props) => {
  const { image, ...otherFields } = props.event;
  const [imagePreview, setImagePreview] = React.useState(getImageSrc(image));
  const [values, setValues] = React.useState(otherFields);
  const [showModal, setShowModal] = React.useState(false);
  const token = useToken();
  const router = useRouter();

  const handleSubmit = React.useCallback(
    async (e: any) => {
      e.preventDefault();
      const [, emptyKey] = Object.entries(values).find(([v, k]) => !v) || [];
      if (emptyKey) {
        toast.error(`please fill in ${emptyKey} field`, {
          position: "bottom-right",
        });
        return;
      }

      const res = await fetch(`${API_URL}/api/events/${props.event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      router.push(`/events/${props.event.id}`);
    },
    [values, props.event.id, token, router]
  );

  const handleChange = React.useCallback((e: any) => {
    setValues((v) => {
      return { ...v, [e.target.name]: e.target.value };
    });
  }, []);

  const createInput = React.useCallback(
    (key: keyof Props["event"], type: string = "text") => {
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

  const handleImageSet = React.useCallback((e: any) => {
    e.preventDefault();
    setShowModal(true);
  }, []);

  const handleUpload = React.useCallback(
    async (errorData?: any) => {
      if (errorData) {
        toast.error(`${errorData.status} error: ${errorData.message}`);
        return;
      }
      router.reload();
    },
    [router]
  );

  const handleModalClose = React.useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <Layout title="Add New Event">
      <Link href={"/events/" + props.event.id}>Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <sc.Form onSubmit={handleSubmit}>
        <sc.Grid>
          {createInput("name")}
          {createInput("performers")}
          {createInput("venue")}
          {createInput("address")}
          {createInput("date", "date")}
          {createInput("time")}
          {createInput("description")}
          <div>
            <label>Image preview </label>
            <div>
              {imagePreview && (
                <Image src={imagePreview} width={170} height={100} alt="" />
              )}

              <button className="btn-secondary" onClick={handleImageSet}>
                <FaImage /> set image
              </button>
            </div>
          </div>
        </sc.Grid>
        <input className="btn" type="submit" value="Update Event" />
      </sc.Form>
      <Modal
        show={showModal}
        onClose={handleModalClose}
        title={props.event.name}
      >
        <ImageUpload
          eventId={props.event.id}
          imageId={props.event.imageId || ""}
          handleUpload={handleUpload}
          token={token}
        />
      </Modal>
    </Layout>
  );
};
export type EditEventContainerProps = Props;
export default React.memo(EditEventContainer);
