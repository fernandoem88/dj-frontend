import React from "react";
import styles from "@styles/Search.module.css";
import { useRouter } from "next/router";

interface Props {}
const Search: React.FC<Props> = (props) => {
  const [term, setTerm] = React.useState("");
  const router = useRouter();

  const handleSubmit = React.useCallback(
    (e: any) => {
      e.preventDefault();
      router.push(`/events/search?term=${term}`);
      setTerm("");
    },
    [term, router]
  );

  const handleChange = React.useCallback((e: any) => {
    setTerm(e.target.value);
  }, []);

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
};
export type SearchProps = Props;
export default React.memo(Search);
