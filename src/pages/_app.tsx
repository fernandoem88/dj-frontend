import "@styles/theme.antd.less";
/* 
// Note: if in the next.config.js file,
// you use "additionalData" in nextWithLess loader,
// then you should uncomment this import.
import "@styles/theme.custom.less";
*/
import "@styles/globals.css";
import React from "react";
import { AuthProvider } from "@src/contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  const [ctx, setCtx] = React.useState({ login: null, error: null });

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
