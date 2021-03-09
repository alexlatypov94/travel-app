import React, { ReactElement, useEffect, useState } from "react";
import { Footer, Header, Main } from "./components";
import { Redirect, Route, Switch } from "react-router";
import { LangContext, contextLang } from "./core";
import "./App.scss";
import { Preloader } from "./components/Preloader/Preloader";

const App = (): ReactElement => {
  const [currentLang, setCurrentLang] = useState("en");
  const [countriesArr, setCountriesArr] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(undefined);

  const changeLanguarge = (e) => {
    setCurrentLang(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/countries/")
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCountriesArr(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Preloader />;
  } else {
    return (
      <LangContext.Provider value={contextLang[currentLang]}>
        <div className="app">
          <Header switchLang={changeLanguarge} />
          <Redirect to="/" exact />
          <Switch>
            <Route path="/" exact render={() => <Main countries={countriesArr} />} />
          </Switch>
          <Footer />
        </div>
      </LangContext.Provider>
    );
  }
};

export default App;
