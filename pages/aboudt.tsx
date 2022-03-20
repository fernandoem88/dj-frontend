import React from "react";

interface Props {}
const AboutPage: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>About</h1>
      <p>this is an app to find the latest dj and </p>
    </div>
  );
};
export type AboutPageProps = Props;
export default React.memo(AboutPage);
