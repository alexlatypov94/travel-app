import React, { ReactElement } from "react";
import { MAIN_DESCRIPTIONS } from "./../../core";
import "./Main.scss";
import { SlickSlider } from "./Slider";

export const Main = (): ReactElement => {
  return (
    <main>
      <div className="user-wrapper">
        <p className="user-wrapper-description">{MAIN_DESCRIPTIONS.en}</p>
        <h1 className="user-name">Aliaksei</h1>
        <img className="user-photo" src="./../../../public/assets/img/photo.png" alt="" />
      </div>
      <div className="country-wrapper">
        <SlickSlider />
      </div>
    </main>
  );
};
