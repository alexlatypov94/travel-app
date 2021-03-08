import React, { Component, ReactElement } from "react";

import { Header } from "./components";

const App = (): ReactElement => {
  return (
    <div className="app">
      <Header title="Hello World" />
    </div>
  );
};

export default App;
