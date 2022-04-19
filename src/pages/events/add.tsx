import AddEventContainer from "@src/containers/AddEventContainer";

export default AddEventContainer;

interface Ctx {
  params: any;
  query: any;
  req: any;
}
export async function getServerSideProps(ctx: Ctx) {
  // const {} = qs.stringify(query);
  // const data = await fetch(`/api/`);
  const { token } = ctx.req.cookies;
  return {
    props: {
      token,
    },
  };
}
