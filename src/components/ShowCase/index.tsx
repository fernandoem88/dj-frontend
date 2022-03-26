import React from "react";
import styles from "@styles/ShowCase.module.css";

interface Props {}
const ShowCase: React.FC<Props> = (props) => {
  return (
    <div className={styles.showcase}>
      <h1>Welcome to the party!</h1>
      <h2>Find the hottest DJ events</h2>
    </div>
  );
};
export type ShowCaseProps = Props;
export default React.memo(ShowCase);
