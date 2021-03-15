
import React, { ReactElement, useEffect, useState } from "react";
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
  const [selectedCountry, setSelectedCountry] = useState("");  const [isAuth, setIsAuth] = useState(false);
  const [countriesSlider, setCountriesSlider] = useState([]);
  const [news, setNews] = useState([]);
  const localnews: any = JSON.parse(localStorage.getItem("news"));

  const handlerLogOut = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  const handlerWithoutReg = () => {
    setIsAuth(true);
  };

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

  const handlerFilter = (value: string) => {
    setCountriesSlider(
      countriesArr.filter((el: any) => {
        const countryNameLowerCase: string = el?.countryName[currentLang].toLowerCase();
        const capitalNameLowerCase: string = el?.capital[currentLang].toLowerCase();
        return countryNameLowerCase.includes(value.toLowerCase()) || capitalNameLowerCase.includes(value.toLowerCase());
      })
    );
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
          setCountriesSlider(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch(
      `https://api.thenewsapi.com/v1/news/top?api_token=joEREGzXgr5XRsIHFOrm22tB1sIc5yLv3cBpimKe&language=${currentLang}&categories=travel,tech&published_after=2021-03-10`
    )
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setNews(result);
          localStorage.setItem("news", JSON.stringify(result));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [currentLang]);

  console.log(news);

  if (error) {
    return <div>Error: {error?.message}</div>;
  } else if (!isLoaded) {
    return <Preloader />;
  } else {

    if (isAuth) {
      return (
        <LangContext.Provider value={contextLang[currentLang]}>
          <div className="app">
            <Header switchLang={changeLanguarge} filterFn={handlerFilter} worldNews={news.data || localnews.data} />
            <Redirect to="/" exact />
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <Main
                    countries={countriesSlider}
                    fnClickCountry={handlerClickCurrentCountry}
                    logOutFn={handlerLogOut}
                  />
                )}
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
        
          <Route
            path="/auth-page"
            exact
            render={() => <AuthPage lang={currentLang} handler={authHandler} withoutRegFn={handlerWithoutReg} />}
          />
        </div>
   
      );
    }
  }
};

export default App;
