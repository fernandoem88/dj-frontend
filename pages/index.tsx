import React from "react";
import { useRouter } from "next/router";

interface Props {}
export default function HomePage() {
  const router = useRouter();
  React.useEffect(() => {
    const [, params] = router.asPath.split("?");
    const qp = params ? "?" + params : "";
    router.replace("/events" + qp);
  }, []);
  return null;
}
