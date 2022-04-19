import React from "react";
import { useRouter } from "next/router";
import * as sc from "./styled";

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
    <sc.Root>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Search Events"
        />
      </form>
    </sc.Root>
  );
};
export type SearchProps = Props;
export default React.memo(Search);
