import React, { ReactElement, useEffect, useState } from "react";
import { Preloader } from "../Preloader";
import { CapitalDate, CurrencyRate, Weather } from "./Widgets";
import "./CountryPage.scss";

export const CountryPage = ({ currentCountry }: any): ReactElement => {
  const [error, setError] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currencyRates, setCurrencyRates] = useState(undefined);
  const [weatherData, setWeatherData] = useState(undefined);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${"Lisbon"}&units=metric&cnt=1&appid=29918b5a8934d94ee39687dc33c08b84`
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
        <div className="info-country"></div>
        <div className="aside-wrapper">
          <Weather country={currentCountry} weather={weatherData} />
          <CapitalDate country={currentCountry} />
          <CurrencyRate country={currentCountry} rates={currencyRates} />
        </div>
      </div>
    );
  }
};
