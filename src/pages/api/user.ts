import { API_URL } from "@src/shared/config";
import type { NextRequest } from "next/server";
import { StrapiResponse } from "@src/types";
import cookie from "cookie";

interface StrapiUser {
  id: 1;
  username: string;
  email: string;
  provider: string; //"local";
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

const handler = async (req, res: any) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return;
  }
  if (!req.headers.cookie) {
    res.status(403).json({ message: "Not authorized!" });
    return;
  }
  try {
    const { token } = cookie.parse(req.headers.cookie);
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (strapiRes.ok) {
      const user = await strapiRes.json();
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "User forbidden!" });
    }
  } catch (error) {
    res.status(500).send({ error: error || "something went wrong" });
  }
};

export default handler;
