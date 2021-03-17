import React, { ChangeEvent, ReactElement, useContext, useEffect, useRef, useState } from "react";
import "./Header.scss";
import "materialize-css";
import { NavLink } from "react-router-dom";
import { LangContext, NEWS, READ_MORE, SEARCH_PLACEHOLDER } from "./../../core";

export const Header = (props: any): ReactElement => {
  const search: any = useRef(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchField, setIsSearchField] = useState(false);
  const [windowLocation, setWindowLocation] = useState("");
  const [showNews, setShowNews] = useState(false);
  const lang: any = useContext(LangContext);
  const handlerChangeLang = (e: ChangeEvent) => {
    props.switchLang(e);
  };

  const handleShowNews = () => {
    setShowNews(!showNews);
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
      <div className={`news ${isSearchField ? "news-show" : "news-hide"}`}>
        <button className="open-news-btn" onClick={handleShowNews}>
          {NEWS[lang]}
        </button>
        <ul className={`news-list ${!showNews ? "nlist-show" : "nlist-hide"}`}>
          {props?.worldNews?.map((el: any, i: number) => {
            return (
              <li className="news-list-item" key={i}>
                <h3 className="news-item-title">{el.title}</h3>
                <img src={el.image_url} alt="" />
                <div className="news-item-description">
                  {el.snippet}
                  <a href={el.url}>{READ_MORE[lang]}</a>
                </div>
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
