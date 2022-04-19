import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import * as sc from "./styled";

interface Props {
  onClose: () => void;
  show: boolean;
  title?: string;
}
const Modal: React.FC<Props> = (props) => {
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => setIsBrowser(true), []);

  const handleClose = (e) => {
    e.preventDefault();
    props.onClose();
  };

  const modalContent = props.show ? (
    <sc.Overlay>
      <sc.Root>
        <sc.Header>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </sc.Header>
        {props.title && <div>{props.title}</div>}
        <sc.Body>{props.children}</sc.Body>
      </sc.Root>
    </sc.Overlay>
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
