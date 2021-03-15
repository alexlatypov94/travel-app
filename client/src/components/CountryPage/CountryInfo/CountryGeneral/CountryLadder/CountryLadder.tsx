import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { ISwitchLang, LangContext, SHOW_BTN } from "../../../../../core";
import "./CountryLadder.scss";

export const CountryLadder = (props: any): ReactElement => {
  const urlGet: string = "http://localhost:3001/api/get-marks";
  const [dataArray, setDataArray] = useState(undefined);
  const [isShow, setIsShow] = useState(false);
  const lang: any = useContext(LangContext);
  const list = useRef();

  const showList = () => {
    isShow ? setIsShow(false) : setIsShow(true);
  };

  useEffect(() => {
    fetch(urlGet)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDataArray(data.arr);
      });
  });

  return (
    <div className="rating-list-wrapper">
      <button className="list-handler" onClick={showList}>
        {SHOW_BTN[lang]}
      </button>
      <ul ref={list} style={isShow ? { display: "block" } : { display: "none" }}>
        {dataArray &&
          dataArray.map((el: any) => {
            if (el.marks[props.countryName] !== "") {
              return (
                <li>
                  <h3>{el.username}</h3>
                  <p>{el.marks[props.countryName]}</p>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};
