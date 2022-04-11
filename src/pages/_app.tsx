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
import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle(
  {},
  css`
    body {
    }
  `
);

function MyApp({ Component, pageProps }) {
  const [ctx, setCtx] = React.useState({ login: null, error: null });

  return (
    <AuthProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
