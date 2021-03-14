import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import "./CountryInfoNav.scss";

export const CountryInfoNav = (): ReactElement => {
  return (
    <div className="country-nav">
      <NavLink to="/country/info">Country Info</NavLink>
      <NavLink to="/country/sightseeing">Galery</NavLink>
      <NavLink to="/country/map">Map</NavLink>
      <NavLink to="/country/video">Video</NavLink>
    </div>
  );
};
