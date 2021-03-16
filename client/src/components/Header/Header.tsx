import React, { ChangeEvent, ReactElement, useContext, useEffect, useRef, useState } from "react";
import "./Header.scss";
import "materialize-css";
import { NavLink } from "react-router-dom";
import { LangContext, SEARCH_PLACEHOLDER } from "./../../core";

export const Header = (props: any): ReactElement => {
  const search: any = useRef(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchField, setIsSearchField] = useState(false);
  const [windowLocation, setWindowLocation] = useState("");
  const handlerChangeLang = (e: ChangeEvent) => {
    props.switchLang(e);
  };

  const handlerCountryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    props.filterFn(e.target.value);
  };

  const handlerSearch = (e: React.KeyboardEvent | any) => {
    if (e.key === "Enter" || e.type === "click") {
      search.current.focus();
      props.filterFn(searchValue);
    }
  };

  const handlerClearInput = () => {
    search.current.focus();
    setSearchValue("");
    props.filterFn("");
  };

  const handlerShowSearch = () => {
    setIsSearchField(false);
  };

  useEffect(() => {
    setWindowLocation(window.location.href);
    if (windowLocation.includes("country")) {
      setIsSearchField(true);
    } else {
      setIsSearchField(false);
    }
  });

  console.log(isSearchField);

  const lang: any = useContext(LangContext);
  return (
    <header>
      <NavLink className="header-globe-nav" to="/" onClick={handlerShowSearch}>
        <object className="header-globe-logo" data="../../../public/assets/img/globe.svg" type="image/svg+xml"></object>
      </NavLink>
      <div className={`header-search-field ${!isSearchField ? "search-show" : "search-hide"}`}>
        <input
          type="text"
          name=""
          id="searchField"
          placeholder={SEARCH_PLACEHOLDER[lang]}
          value={searchValue}
          onChange={handlerCountryName}
          onKeyDown={handlerSearch}
          autoComplete="off"
          autoFocus
          ref={search}
        />
        <button className="cross-input" onClick={handlerClearInput}>
          <img src="./../../public/assets/img/remove.svg" alt="" />
        </button>
        <button className="search-input" onClick={handlerSearch}>
          <img src="./../../public/assets/img/transparency.svg" alt="" />
        </button>
      </div>
      <select className="header-select-lang" name="languarge" id="changeLang" onChange={handlerChangeLang}>
        <option value="en">en</option>
        <option value="ru">ru</option>
        <option value="es">es</option>
      </select>
    </header>
  );
};
