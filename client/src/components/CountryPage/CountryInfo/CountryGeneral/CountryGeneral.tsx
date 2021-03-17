import React, { ReactElement, useContext, useState } from "react";
import { LangContext, LANG_CAPITAL, LANG_COUNTRY } from "./../../../../core";
import "./CountryGeneral.scss";
import { RatingStar } from "./RaitingStar";
import { CountryLadder } from "./CountryLadder";

export const CountryGeneral = ({ country }: any): ReactElement => {
  const lang: any = useContext(LangContext);

  const [mark, setMark] = useState("");
  const saveData = (e: string) => {
    setMark(e);
  };

  return (
    <div className="country-general-wrapper">
      <div className="country-general-flag-wrapper">
        <div className="country-general-name-wrapper">
          <span className="country-general-name-title">{`${LANG_COUNTRY[lang]}`}:&nbsp;</span>
          <span className="country-general-name">{country?.countryName[lang]}</span>
        </div>
        <div className="country-general-name-wrapper">
          <span className="country-general-name-title">{`${LANG_CAPITAL[lang]}`}:&nbsp;</span>
          <span className="country-general-name">{country?.capital[lang]}</span>
        </div>

        {country.countryCode === "PRT" ? (
          <img className="country-general-flag" src="https://www.countryflags.io/PT/flat/64.png" alt="" />
        ) : (
          <img
            className="country-general-flag"
            src={`https://www.countryflags.io/${country.countryCode}/flat/64.png`}
            alt=""
          />
        )}

        <RatingStar countryName={country.country} mark={mark} />
        <CountryLadder countryName={country.country} data={saveData} />
      </div>
      <p className="country-general-description">{country?.countryDescription[lang]}</p>
    </div>
  );
};
