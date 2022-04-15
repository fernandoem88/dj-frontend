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

const logoutHandler = async (req, res: any) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return;
  }

  try {
    // const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({}),
    // });
    // const result = await strapiRes.json();
    const isNodeEnvDev = process.env.NODE_ENV === "development";
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: !isNodeEnvDev,
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).send({ error: error || "something went wrong" });
  }
};

export default logoutHandler;
