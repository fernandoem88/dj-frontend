// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import data from "./data.json";

const handler = (req: any, res: any) => {
  if (req.method === "GET") {
    res.status(200).json(data.events);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default handler;
