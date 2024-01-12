import { Html, Head, Main, NextScript } from "next/document";
import HomePage from "./HomePage";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        {/* <NextScript /> */}
        <HomePage />
      </body>
    </Html>
  );
}
