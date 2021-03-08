import React, { ReactElement, useContext } from "react";
import { ISwitchLang, LangContext, MAIN_DESCRIPTIONS } from "./../../core";
import "./Main.scss";
import { SlickSlider } from "./Slider";

export const Main = (): ReactElement => {
  const currentLang: ISwitchLang = useContext(LangContext);
  return (
    <main>
      <p className="user-wrapper-description">{MAIN_DESCRIPTIONS[currentLang]}</p>
      <div className="main-content">
        <div className="user-wrapper">
          <h1 className="user-name">Aliaksei</h1>
          <img className="user-photo" src="./../../../public/assets/img/photo.png" alt="" />
        </div>
        <div className="country-wrapper">
          <SlickSlider />
        </div>
      </div>
    </main>
  );
};
