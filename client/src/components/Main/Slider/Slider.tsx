import React, { ReactElement, useContext } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { LangContext } from "./../../../core";
import "./Slider.scss";

export const SlickSlider = (props: any): ReactElement => {
  const lang: any = useContext(LangContext);
  const settings: any = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1078,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 698,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handlerClickCountry = (el: string) => {
    props.fnClick(el);
  };

  return (
    <Slider {...settings}>
      {props.countries.map((el: any, i: number) => {
        return (
          <NavLink key={i} to="/country" className="slider-item-castom" onClick={() => handlerClickCountry(el.country)}>
            <img src={el.countryMainImg} alt="" />
            <div className="item-hover-content">
              <h1>{el.countryName[lang]}</h1>
              {el.countryCode === "PRT" ? (
                <img className="item-hover-flag" src="https://www.countryflags.io/PT/shiny/64.png" alt=""></img>
              ) : (
                <img
                  className="item-hover-flag"
                  src={`https://www.countryflags.io/${el.countryCode}/shiny/64.png`}
                  alt=""
                ></img>
              )}
            </div>
          </NavLink>
        );
      })}
    </Slider>
  );
};
