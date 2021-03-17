import React, { ReactElement, useContext, useEffect, useState } from "react";
import { LangContext } from "./../../../../core";
import "./CountryGeneral.scss";
import { RatingStar } from "./RaitingStar";
import { CountryLadder } from "./CountryLadder";

export const CountryGeneral = ({ country, countryName }: any): ReactElement => {
  const lang: any = useContext(LangContext);
  const [flag, setFlag] = useState("");
  const [mark, setMark] = useState("");
  const saveData = (e: string) => {
    setMark(e);
  };

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all?fields=name;population;flag")
      .then((response) => response.json())
      .then((result) => {
        result.map((el: any) => {
          return country?.countryName?.en === el?.name ? setFlag(el?.flag) : undefined;
        });
      });
  }, []);

  return (
    <div className="country-general-wrapper">
      <div className="country-general-flag-wrapper">
        <div className="country-general-name-wrapper">
          <span className="country-general-name-title">Country:&nbsp;</span>
          <span className="country-general-name">{country?.countryName[lang]}</span>
        </div>
        <div className="country-general-name-wrapper">
          <span className="country-general-name-title">Capital:&nbsp;</span>
          <span className="country-general-name">{country?.capital[lang]}</span>
        </div>
        <img className="country-general-flag" src={flag} alt="" />
        <RatingStar countryName={countryName} mark={mark} />
        <CountryLadder countryName={countryName} data={saveData} />
      </div>
      <p className="country-general-description">{country?.countryDescription[lang]}</p>
    </div>
  );
};
