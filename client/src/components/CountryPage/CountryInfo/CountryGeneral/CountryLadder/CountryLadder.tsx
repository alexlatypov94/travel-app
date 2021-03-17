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
        if (data.arr) {
          const newArr: any = data.arr.filter((el: any) => el.marks[props.countryName] !== "");
          setDataArray(newArr);
          const find: Object = data.arr.find((el: any) => el.username === window.localStorage.getItem("username"));
          props.data(find.marks[props.countryName]);
        }
      });
  }, [dataArray]);

  return (
    <div className="rating-list-wrapper">
      <button className={isShow ? "list-handler active" : "list-handler"} onClick={showList}>
        {SHOW_BTN[lang]}
      </button>
      <ul ref={list} style={isShow && dataArray ? { display: "block" } : { display: "none" }}>
        {dataArray &&
          dataArray.map((el: any, index: number) => {
            if (el.marks[props.countryName] !== "") {
              return (
                <li key={index}>
                  <p>
                    <strong>{el.username} </strong>: {el.marks[props.countryName]}
                  </p>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};
