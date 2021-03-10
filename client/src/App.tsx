import React, { ReactElement, useEffect, useState } from "react";
import { Footer, Header, Main, AuthPage } from "./components";
import { Redirect, Route, Switch } from "react-router";
import { LangContext, contextLang } from "./core";
import "./App.scss";

const App = (): ReactElement => {
  const [currentLang, setCurrentLang] = useState("en");
  // const [countriesArr, setCountriesArr] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [error, setError] = useState(null);

  const changeLanguarge = (e) => {
    setCurrentLang(e.target.value);
  };

  return (
    <LangContext.Provider value={contextLang[currentLang]}>
      <div className="app">
        <AuthPage />
        {/* <Header switchLang={changeLanguarge} />
        <Redirect to="/" exact />
        <Switch>
          <Route path="/" exact render={() => <Main />} />
        </Switch>
        <Footer /> */}
      </div>
    </LangContext.Provider>
  );
  // return (
  //   <div className="app">
  //     <ul>
  //       {countriesArr.map((el, i) => (
  //         <li>{el.countryName.en}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default App;
