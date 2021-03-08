import React, { ReactElement, useState } from "react";
import { Footer, Header, Main } from "./components";
import "./App.scss";
import { Redirect, Route, Switch } from "react-router";
import { LangContext, contextLang } from "./core";

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
          {/* <Route path={`/${}`} */}
        </Switch>

        <Footer />
      </div>
    </LangContext.Provider>
  );
};

export default App;
