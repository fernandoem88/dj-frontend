import { API_URL } from "@src/shared/config";
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
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return;
  }

  const { username, email, password } = req.body;
  try {
    const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const result:
      | Omit<StrapiResponse, "meta">
      | { jwt: string; user: StrapiUser } = await strapiRes.json();

    if ("error" in result) {
      res.status(result.error.status).send({
        ...result,
        message: result.error.details.errors[0].message,
      });
      return;
    }

    if ("user" in result) {
      // TODO: set cookies
      const isNodeEnvDev = process.env.NODE_ENV === "development";
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", result.jwt, {
          httpOnly: true,
          secure: !isNodeEnvDev,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).send({ user: result.user, token: result.jwt });
      return;
    }
    res.status(405).send({ message: (result as any).message[0].messages[0] });
  } catch (error) {
    res.status(500).send({ error: error || "something went wrong" });
  }
};

export default handler;
