
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Footer, Header, Main, AuthPage, ProfilePage } from "./components";

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

    fetch("http://localhost:3001/api/countries", { mode: "no-cors" })
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
      return <div>Error: {error?.message}</div>;
    } else if (!isLoaded) {
      return <Preloader />;
    } else {
      return (
        <LangContext.Provider value={contextLang[currentLang]}>
          <div className="app">
            <Header switchLang={changeLanguarge} />
            {/* <Redirect to="/country" exact /> */}
            <Switch>
				<Route
	              path="/auth-page"
	              exact
	              render={() => <AuthPage redirect={() => <Redirect to="/" exact />} lang={currentLang} />}
	            />
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
    }
    );
  }
};

export default App;
