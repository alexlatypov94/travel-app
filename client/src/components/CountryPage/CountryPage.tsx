import React, { ReactElement, useEffect, useState } from "react";
import { Preloader } from "../Preloader";
import { CapitalDate, CurrencyRate, Weather } from "./Widgets";
import "./CountryPage.scss";
import { CountryGeneral, CountryInfoNav, CountryMap, CountryVideo, Sightseeing } from "./CountryInfo";
import { Redirect, Route } from "react-router";

export const CountryPage = ({ currentCountry }: any): ReactElement => {
  const [error, setError] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currencyRates, setCurrencyRates] = useState(undefined);
  const [weatherData, setWeatherData] = useState(undefined);
  const country: any = JSON.parse(localStorage.getItem("currentCountry")!);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${country.capital.en}&units=metric&cnt=1&appid=29918b5a8934d94ee39687dc33c08b84`
    )
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setWeatherData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    fetch("https://openexchangerates.org/api/latest.json?app_id=8f701a3e421348ca9870fb94fb7a39e0")
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCurrencyRates(result.rates);
        },
        (error) => {
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
      <div className="country-page-wrapper">
        <div className="info-country">
          <CountryInfoNav />
          <div className="country-info-wrapper">
            <Redirect to="/country/map" />
            <Route
              path="/country/info"
              render={() => <CountryGeneral country={currentCountry || country} countryName={currentCountry.country} />}
            />
            <Route
              path="/country/sightseeing"
              render={() => (
                <Sightseeing currentCountry={currentCountry.countryAttractions || country.countryAttractions} />
              )}
            />
            <Route
              path="/country/map"
              render={() => <CountryMap coord={currentCountry.countryCoordinate || country.countryCoordinate} />}
            />
            <Route
              path="/country/video"
              render={() => <CountryVideo video={currentCountry.countryVideo || country.countryVideo} />}
            />
          </div>
        </div>
        <div className="aside-wrapper">
          <Weather country={currentCountry || country} weather={weatherData} />
          <CapitalDate country={currentCountry || country} />
          <CurrencyRate country={currentCountry} rates={currencyRates} />
        </div>
      </div>
    );
  }
};
