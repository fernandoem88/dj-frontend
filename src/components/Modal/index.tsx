import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "@styles/Modal.module.css";

interface Props {
  onClose: () => void;
  show: boolean;
  title?: string;
}
const Modal: React.FC<Props> = (props) => {
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => setIsBrowser(true));

  const handleClose = (e) => {
    e.preventDefault();
    props.onClose();
  };

  const modalContent = props.show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {props.title && <div>{props.title}</div>}
        <div className={styles.body}>{props.children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};
export type ModalProps = Props;
export default React.memo(Modal) as typeof Modal;
