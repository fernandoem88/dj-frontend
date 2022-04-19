import React from "react";
import * as sc from "./styled";

interface Props {}
const ShowCase: React.FC<Props> = (props) => {
  return (
    <sc.Root>
      <h1>Welcome to the party!</h1>
      <h2>Find the hottest DJ events</h2>
    </sc.Root>
  );
};
export type ShowCaseProps = Props;
export default React.memo(ShowCase);
