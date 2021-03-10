import React, { ReactElement } from "react";
import "./CountryPage.scss";

export const CountryPage = ({ currentCountry }: any): ReactElement => {
  return (
    <div className="country-page-wrapper">
      <div className="info-country">Инфа по стране(Николай)</div>
      <div className="aside-wrapper">Виджеты(Алексей)</div>
    </div>
  );
};
