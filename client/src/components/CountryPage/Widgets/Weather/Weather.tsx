import React, { ReactElement } from "react";
import "./Weather.scss";

export const Weather = ({ weather }: any): ReactElement => {
  return (
    <aside className="widget-wrapper weather-widget">
      <h1 className="weather-widget-title">Weather</h1>
      <div className="weather-data-wrapper">
        <h1 className="weather-name">{weather?.list[0]?.weather[0]?.main}</h1>
        <img src={`http://openweathermap.org/img/wn/${weather?.list[0]?.weather[0]?.icon}@2x.png`} alt="" />
        <h3 className="weather-temp">{weather?.list[0]?.main?.temp} &deg;С</h3>
        <h3 className="weather-desc">{weather?.list[0]?.weather[0]?.description}</h3>
      </div>
    </aside>
  );
};
