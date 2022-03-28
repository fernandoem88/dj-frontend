import data from "./data.json";

const handler = (req: any, res: any) => {
  if (req.method === "GET") {
    const evt = data.events.filter((e) => e.slug === req.query.slug);
    res.status(200).json(evt);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
