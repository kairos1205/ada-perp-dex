import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";

import "@/styles/globals.css";
import "@meshsdk/react/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="oswald-font">
      <MeshProvider>
        <Component {...pageProps} />
      </MeshProvider>
    </div>
  );
}
