import React, { ReactElement, useContext } from "react";
import { NavLink } from "react-router-dom";
import { COUNTRY_PAGE_NAV, LangContext } from "./../../../../core";
import "./CountryInfoNav.scss";

export const CountryInfoNav = ({ country }: any): ReactElement => {
  const lang: any = useContext(LangContext);
  return (
    <div className="country-nav">
      <NavLink to={`/country/:${country.country}/info`}>{COUNTRY_PAGE_NAV.info[lang]}</NavLink>
      <NavLink to={`/country/:${country.country}/sightseeing`}>{COUNTRY_PAGE_NAV.gallery[lang]}</NavLink>
      <NavLink to={`/country/:${country.country}/map`}>{COUNTRY_PAGE_NAV.map[lang]}</NavLink>
      <NavLink to={`/country/:${country.country}/video`}>{COUNTRY_PAGE_NAV.video[lang]}</NavLink>
    </div>
  );
};
