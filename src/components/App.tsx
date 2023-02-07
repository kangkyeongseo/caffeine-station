import React from "react";
import AppRouter from "./Router";

export const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  return <AppRouter />;
}

export default App;
