import React from "react";
import * as scEdit from "@src/containers/EditEventContainer/styled";
import { API_URL } from "@src/shared/config";
import { StrapiResponse } from "@src/types";

interface Props {
  eventId: string;
  handleUpload: (error?: any) => void;
  token: string;
  imageId: string;
}
const ImageUpload: React.FC<Props> = (props) => {
  const [image, setImage] = React.useState(null);
  const handleSubmit = React.useCallback(
    async (e: any) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("files", image);
      // connection to STRAPI
      // The unique ID (uid) of the model which the file(s) will be linked to
      formData.append("ref", "api::event.event");
      // The ID of the entry which the file(s) will be linked to
      formData.append("refId", props.eventId);
      // image is the content field name
      formData.append("field", "image");
      formData.append("path", "dj-events");

      const query = props.imageId ? `id=${props.imageId}` : "";
      const res = await fetch(`${API_URL}/api/upload?${query}`, {
        method: props.imageId ? "PUT" : "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      const { error }: StrapiResponse = await res.json();
      props.handleUpload(error);
    },
    [image, props]
  );

  const handleFileChange = React.useCallback((e: any) => {
    setImage(e.target.files[0]);
  }, []);
  return (
    <div>
      <h1>Upload Event image</h1>
      <scEdit.Form onSubmit={handleSubmit}>
        <scEdit.File>
          <input type="file" onChange={handleFileChange} />
        </scEdit.File>
        <input type="submit" value="upload" className="btn" />
      </scEdit.Form>
    </div>
  );
};
export type ImageUploadProps = Props;
export default React.memo(ImageUpload);
