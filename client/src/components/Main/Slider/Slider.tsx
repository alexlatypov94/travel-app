import React, { ReactElement, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { LangContext } from "./../../../core";
import "./Slider.scss";

export const SlickSlider = (props: any): ReactElement => {
  const lang: any = useContext(LangContext);
  const [countryApi, setCountryApi] = useState([]);
  const settings: any = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  const handlerClickCountry = (el: string) => {
    props.fnClick(el);
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
      {props.countries.map((el: any, i: number) => {
        return (
          <NavLink key={i} to="/country" className="slider-item-castom" onClick={() => handlerClickCountry(el.country)}>
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
    </Slider>
  );
};
