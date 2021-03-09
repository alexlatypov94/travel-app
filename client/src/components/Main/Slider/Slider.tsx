import React, { ReactElement, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { LangContext } from "./../../../core";
import "./Slider.scss";

export const SlickSlider = ({ countries }: any): ReactElement => {
  const lang: any = useContext(LangContext);
  const [countryApi, setCountryApi] = useState([]);
  const settings: any = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all?fields=name;population;flag")
      .then((response) => response.json())
      .then((result) => {
        setCountryApi(result);
      });
  }, []);

  return (
    <Slider {...settings}>
      {countries.map((el: any, i: number) => {
        return (
          <NavLink key={i} to="/country" className="slider-item-castom">
            <img src={el.countryMainImg} alt="" />
            <div className="item-hover-content">
              <h1>{el.countryName[lang]}</h1>
              {countryApi.map((elCountry: any, index) => {
                return el.countryName.en === elCountry.name ? (
                  <img className="item-hover-flag" key={index} src={elCountry.flag} alt="" />
                ) : undefined;
              })}
            </div>
          </NavLink>
        );
      })}
      {/* <NavLink to="/cuba" className="slider-item-castom">
        <img src="./../../../public/assets/img/cuba-bg.jpg" alt="" />
        <div className="item-hover-content">
          <h1>Cuba</h1>
        </div>
      </NavLink>

      <NavLink to="/england" className="slider-item-castom">
        <img src="./../../../public/assets/img/england-bg.jpg" alt="" />
        <div className="item-hover-content">
          <h1>England</h1>
        </div>
      </NavLink>

      <NavLink to="/mexico" className="slider-item-castom">
        <img src="./../../../public/assets/img/mexico-bg.jpg" alt="" />
        <div className="item-hover-content">
          <h1>Mexico</h1>
        </div>
      </NavLink>

      <NavLink to="/portugal" className="slider-item-castom">
        <img src="./../../../public/assets/img/portugal-bg.jpg" alt="" />
        <div className="item-hover-content">
          <h1>Portugal</h1>
        </div>
      </NavLink>

      <NavLink to="/tunis" className="slider-item-castom">
        <img src="./../../../public/assets/img/tunis-bg.jpg" alt="" />
        <div className="item-hover-content">
          <h1>Tunis</h1>
        </div>
      </NavLink>

      <NavLink to="turkey" className="slider-item-castom">
        <img src="./../../../public/assets/img/turkey-bg.jpg" alt="" />
        <div className="item-hover-content">
          <h1>Turkey</h1>
        </div>
      </NavLink> */}
    </Slider>
  );
};
