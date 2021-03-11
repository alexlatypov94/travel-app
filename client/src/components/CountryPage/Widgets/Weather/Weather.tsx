import React, { ReactElement } from "react";
import "./Weather.scss";

export const Weather = ({ temp, icon, description }: any): ReactElement => {
  return (
    <aside className="widget-wrapper weather-widget">
      <h1 className="weather-widget-title">Weather</h1>
      <div className="weather-data-wrapper">
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <h3 className="weather-temp">{temp} &deg;С</h3>
        <h3 className="weather-desc">{description}</h3>
      </div>
    </aside>
  );
};
