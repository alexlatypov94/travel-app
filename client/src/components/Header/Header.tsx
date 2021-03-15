import React, { ChangeEvent, MouseEvent, ReactElement, useContext, useState } from "react";
import "./Header.scss";
import "materialize-css";
import { NavLink, Redirect } from "react-router-dom";
import { LangContext, SEARCH_PLACEHOLDER } from "./../../core";

export const Header = (props: any): ReactElement => {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handlerChangeLang = (e: ChangeEvent) => {
    props.switchLang(e);
  };

  const handlerCountryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCountries(
      props.countriesName.filter((el: string) => {
        return el.includes(e.target.value.toLocaleLowerCase());
      })
    );
  };

  const handlerClickCountry = (e: any) => {
    setInputValue(e.target.innerText);
    setCountries([]);
  };

  const handlerKeyPressInput = (e: React.KeyboardEvent) => {
    return <Redirect to="/country" exact />;
  };

  const lang: any = useContext(LangContext);
  return (
    <header>
      <NavLink className="header-globe-nav" to="/">
        <object className="header-globe-logo" data="../../../public/assets/img/globe.svg" type="image/svg+xml"></object>
      </NavLink>
      <div className="header-search-field">
        <input
          type="text"
          name=""
          id="searchField"
          placeholder={SEARCH_PLACEHOLDER[lang]}
          value={inputValue}
          onChange={handlerCountryName}
          onKeyPress={handlerKeyPressInput}
        />
        <ul className="search-list">
          {countries.map((el: string, i: number) => {
            return (
              <li className="search-list-item" key={i} onClick={handlerClickCountry}>
                {el}
              </li>
            );
          })}
        </ul>
      </div>
      <select className="header-select-lang" name="languarge" id="changeLang" onChange={handlerChangeLang}>
        <option value="en">en</option>
        <option value="ru">ru</option>
        <option value="es">es</option>
      </select>
    </header>
  );
};
