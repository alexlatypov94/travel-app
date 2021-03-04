import React, { Component, ReactElement } from "react";

import { Header } from "./components";

class App extends Component {
  public render(): ReactElement {
    return (
      <div className="app">
        <Header title="Hello World" />
      </div>
    );
  }
}

export default App;
