import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "./Slider.scss";

export const SlickSlider = (): ReactElement => {
  const settings: any = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true
  };
  return (
    <Slider {...settings}>
      <NavLink to="/cuba" className="slider-item-castom">
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
      </NavLink>
    </Slider>
  );
};
