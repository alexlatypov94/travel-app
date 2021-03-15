import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Footer, Header, Main, AuthPage } from "./components";

import { Redirect, Route, Switch } from "react-router";
import { LangContext, contextLang } from "./core";
import "./App.scss";
import { Preloader } from "./components/Preloader/Preloader";
import { CountryPage } from "./components/CountryPage/CountryPage";

const App = (): ReactElement => {
  const [currentLang, setCurrentLang] = useState("en");
  const [countriesArr, setCountriesArr] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(undefined);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [countriesName, setCountriesName] = useState([]);

  const authHandler = (bool) => {
    setIsAuth(bool);
  };

  const changeLanguarge = (e) => {
    setCurrentLang(e.target.value);
  };

  const handlerClickCurrentCountry = (e) => {
    const country: any = countriesArr?.find((item: any) => {
      return item?.country === e ? item : undefined;
    });
    setSelectedCountry(country);
    localStorage.setItem("currentCountry", JSON.stringify(country));
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setIsAuth(true);
    }
    fetch("http://localhost:3001/api/countries", { mode: "no-cors" })
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCountriesArr(result);
          setCountriesName(
            result.map((el) => {
              return el.country;
            })
          );
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error?.message}</div>;
  } else if (!isLoaded) {
    return <Preloader />;
  } else {
    if (isAuth) {
      return (
        <LangContext.Provider value={contextLang[currentLang]}>
          <div className="app">
            <Header switchLang={changeLanguarge} countriesName={countriesName} />
            <Redirect to="/" exact />
            <Switch>
              <Route
                path="/"
                exact
                render={() => <Main countries={countriesArr} fnClickCountry={handlerClickCurrentCountry} />}
              />
              <Route path="/country" render={() => <CountryPage currentCountry={selectedCountry} />} />
            </Switch>
            <Footer />
          </div>
        </LangContext.Provider>
      );
    } else {
      return (
        <div className="app">
          <Redirect to="/auth-page" exact />
          <Route path="/auth-page" exact render={() => <AuthPage lang={currentLang} handler={authHandler} />} />
        </div>
      );
    }
  }
};

export default App;
