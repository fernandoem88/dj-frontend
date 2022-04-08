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
