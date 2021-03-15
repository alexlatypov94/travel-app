import React, { ReactElement, useContext } from "react";
import { ISwitchLang, LangContext, MAIN_DESCRIPTIONS } from "./../../core";
import { SlickSlider } from "./Slider";
import "./Main.scss";
import { ProfilePage } from "../ProfilePage";

export const Main = (props: any): ReactElement => {
  const currentLang: ISwitchLang = useContext(LangContext);
  const handlerClickCountry = (e: string) => {
    props.fnClickCountry(e);
  };

  return (
 
    <main className="container">
      <p className="user-wrapper-description">{MAIN_DESCRIPTIONS[currentLang]}</p>
      <div className="main-content">
      
        <ProfilePage />
        {/* <div className="user-wrapper">
   
          <ProfilePage logOutFn={props.logOutFn} />
      
        </div> */}

        <div className="country-wrapper">
          <SlickSlider countries={props.countries} fnClick={handlerClickCountry} />
        </div>
      </div>
    </main>
  );
};
