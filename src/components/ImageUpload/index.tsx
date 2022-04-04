import React from "react";
import styles from "@styles/Form.module.css";
import { API_URL } from "@src/shared/config";
import { StrapiResponse } from "@src/types";

interface Props {
  id: string;
  handleUpload: (error?: any) => void;
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
      formData.append("refId", props.id);
      // image is the content field name
      formData.append("field", "image");
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const { error }: StrapiResponse = await res.json();
      props.handleUpload(error);
    },
    [image, props.id, props.handleUpload]
  );

  const handleFileChange = React.useCallback((e: any) => {
    setImage(e.target.files[0]);
  }, []);
  return (
    <div className={styles.form}>
      <h1>Upload Event image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="upload" className="btn" />
      </form>
    </div>
  );
};
export type ImageUploadProps = Props;
export default React.memo(ImageUpload);