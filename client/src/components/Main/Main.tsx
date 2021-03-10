import React, { ReactElement, useContext } from "react";
import { ISwitchLang, LangContext, MAIN_DESCRIPTIONS } from "./../../core";
import { SlickSlider } from "./Slider";
import "./Main.scss";

export const Main = (props: any): ReactElement => {
  const currentLang: ISwitchLang = useContext(LangContext);
  const handlerClickCountry = (e: string) => {
    props.fnClickCountry(e);
  };
  return (
    <main>
      <p className="user-wrapper-description">{MAIN_DESCRIPTIONS[currentLang]}</p>
      <div className="main-content">
        <div className="user-wrapper">
          <h1 className="user-name">Aliaksei</h1>
          <img className="user-photo" src="./../../../public/assets/img/photo.png" alt="" />
        </div>
        <div className="country-wrapper">
          <SlickSlider countries={props.countries} fnClick={handlerClickCountry} />
        </div>
      </div>
    </main>
  );
};
