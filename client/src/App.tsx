import React, { ReactElement, useState } from "react";
import { Footer, Header, Main } from "./components";
import { Redirect, Route, Switch } from "react-router";
import { LangContext, contextLang } from "./core";
import "./App.scss";

const App = (): ReactElement => {
  const [currentLang, setCurrentLang] = useState("en");

  const changeLanguarge = (e) => {
    setCurrentLang(e.target.value);
  };

  return (
    <LangContext.Provider value={contextLang[currentLang]}>
      <div className="app">
        <Header switchLang={changeLanguarge} />
        <Redirect to="/" exact />
        <Switch>
          <Route path="/" exact render={() => <Main />} />
        </Switch>

        <Footer />
      </div>
    </LangContext.Provider>
  );
};

export default App;
