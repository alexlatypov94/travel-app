import React, { ReactElement, useEffect, useState } from "react";
import { Preloader } from "../Preloader";
import { CapitalDate, CurrencyRate, Weather } from "./Widgets";
import "./CountryPage.scss";

export const CountryPage = ({ currentCountry }: any): ReactElement => {
  const [error, setError] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [tempIcon, setTempIcon] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${"Lisbon"}&units=metric&cnt=1&appid=29918b5a8934d94ee39687dc33c08b84`
    )
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTemperature(result.list[0].main.temp);
          setTempIcon(result.list[0].weather[0].icon);
          setWeatherDescription(result.list[0].weather[0].description);
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
      <div className="country-page-wrapper">
        <div className="info-country"></div>
        <div className="aside-wrapper">
          <Weather country={currentCountry} temp={temperature} icon={tempIcon} description={weatherDescription} />
          <CapitalDate country={currentCountry} />
          <CurrencyRate />
        </div>
      </div>
    );
  }
};
