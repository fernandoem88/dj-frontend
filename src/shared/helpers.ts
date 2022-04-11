// import cookie from "cookie";
export const parseCookies = (req: any) => {
  //   const cookies = cookie.parse(req?.haders?.cookie || "") as {
  //     [K: string]: string;
  //   };

  return req.cookies;
};
