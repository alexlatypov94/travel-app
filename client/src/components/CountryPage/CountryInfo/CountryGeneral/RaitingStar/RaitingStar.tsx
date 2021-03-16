

import React, { ReactElement, useContext, useEffect, useState } from "react";
import "./RaitingStar.scss";
import { ISwitchLang, LangContext, MARKS } from "../../../../../core";



export const RatingStar = (props: any): ReactElement => {
  const lang: any = useContext(LangContext);
  const urlPost: string = "http://localhost:3001/api/send-mark";
  const [mark, setMark] = useState("");
  const [isSend, setIsSend] = useState(false);


  const postMark = (e: any) => {
    setIsSend(true);
    setMark(e.target.value);
  };

  useEffect(() => {
    fetch(urlPost, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: window.localStorage.getItem('username'),
        mark: mark,
        country: props.countryName
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setIsSend(false);
      });
  });

  const lang: any = useContext(LangContext);

  return (
    <div className="rating-area">

     
      <input type="radio" id="star-5" name="rating" value="5" onClick={postMark} />
      <label htmlFor="star-5" title={`${MARKS[lang]}«5»`}></label>
  
      <input type="radio" id="star-4" name="rating" value="4" onClick={postMark} />
      <label htmlFor="star-4" title={`${MARKS[lang]}«4»`}></label>
   
      <input type="radio" id="star-3" name="rating" value="3" onClick={postMark} />
      <label htmlFor="star-3" title={`${MARKS[lang]}«3»`}></label>

      <input type="radio" id="star-2" name="rating" value="2" onClick={postMark} />
      <label htmlFor="star-2" title={`${MARKS[lang]}«2»`}></label>

      <input type="radio" id="star-1" name="rating" value="1" onClick={postMark} />
      <label htmlFor="star-1" title={`${MARKS[lang]}«1»`}></label>
    </div>
  );
};
