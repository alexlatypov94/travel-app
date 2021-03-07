import React, { Component, ReactElement } from "react";

import { Footer, Header, Main } from "./components";

import "./App.scss";
import { Redirect, Route, Switch } from "react-router";

class App extends Component {
  public render(): ReactElement {
    return (
      <div className="app">
        <Header />
        <Redirect to="/" exact />
        <Switch>
          <Route path="/" exact component={Main} />
          {/* <Route path={`/${}`} */}
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default App;
