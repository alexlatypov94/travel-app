import React, { ReactElement, useContext, useEffect, useState } from "react";
import { LangContext } from "./../../../../core";
import "./CapitalDate.scss";

export const CapitalDate = ({ country }: any): ReactElement => {
  const [date, setDate] = useState(new Date());
  const lang: any = useContext(LangContext);

  useEffect(() => {
    const interval: any = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <aside className="widget-wrapper date-widget">
      {/* <h1 className="date-widget-title">Date</h1> */}
      <div className="date-widget-info">
        <h1 className="date-widget-capital">{country.capital[lang]}</h1>
        <h3 className="date-widget-day">
          {date.toLocaleString(lang, { weekday: "long", timeZone: country?.countryTimeZone })}
        </h3>
        <span className="date-widget-date-num">
          {date.toLocaleString(lang, { month: "long", day: "numeric", timeZone: country?.countryTimeZone })}
        </span>
        <div className="date-widget-time">
          <span>{date.toLocaleTimeString(lang, { timeZone: country?.countryTimeZone })}</span>
        </div>
      </div>
    </aside>
  );
};
