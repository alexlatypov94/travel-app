import React, { Component, ReactElement } from "react";

import { Header } from "./components";

const App = (): ReactElement => {
  async function fetchMovies() {
    const response: any = await fetch("http://localhost:3001/api/countries", { method: "GET" });
    // waits until the request completes...
    const data: any = response.json();
    // eslint-disable-next-line no-console
    console.log(data);
  }
  fetchMovies();
  return (
    <div className="app">
      <Header title="Hello World" />
    </div>
  );
};

export default App;
