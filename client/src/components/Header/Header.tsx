import React, { ChangeEvent, ReactElement, useContext } from "react";
import "./Header.scss";
import "materialize-css";

export const Header = ({ switchLang }: any): ReactElement => {
  const handlerChangeLang = (e: ChangeEvent) => {
    switchLang(e);
  };
  return (
    <header>
      <object className="header-globe-logo" data="../../../public/assets/img/globe.svg" type="image/svg+xml"></object>
      <div className="header-search-field">
        <input type="text" name="" id="searchField" placeholder="Enter country name" />
      </div>
      <select className="header-select-lang" name="languarge" id="changeLang" onChange={handlerChangeLang}>
        <option value="en">en</option>
        <option value="ru">ru</option>
        <option value="es">es</option>
      </select>
    </header>
  );
};
