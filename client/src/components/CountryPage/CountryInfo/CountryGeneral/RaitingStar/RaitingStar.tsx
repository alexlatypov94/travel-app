import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import "./RaitingStar.scss";
import { ISwitchLang, LangContext, MARKS } from "../../../../../core";

export const RatingStar = (props: any): ReactElement => {
  const star1: any = useRef();
  const star2: any = useRef();
  const star3: any = useRef();
  const star4: any = useRef();
  const star5: any = useRef();
  const lang: any = useContext(LangContext);
  const urlPost: string = "http://localhost:3001/api/send-mark";
  const [mark, setMark] = useState("");
  const [savedMark, setSavedMark] = useState("");
  const [isSend, setIsSend] = useState(false);

  const postMark = (e: any) => {
    setIsSend(true);
    setMark(e.target.value);
  };

  useEffect(() => {
    setSavedMark(props.mark);
    if (savedMark) {
      switch (props.mark) {
        case "1":
          star1.current.checked = true;
          break;
        case "2":
          star2.current.checked = true;
          break;
        case "3":
          star3.current.checked = true;
          break;
        case "4":
          star4.current.checked = true;
          break;
        case "5":
          star5.current.checked = true;
          break;
        default:
          break;
      }
    }
    if (isSend) {
      fetch(urlPost, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: window.localStorage.getItem("username"),
          mark: mark,
          country: props.countryName
        })
      })
        .then((res) => res.json())
        .then((data) => {
          setIsSend(false);
        });
    }
  });

  return (
    <div className="rating-area">
      <input type="radio" id="star-5" name="rating" value="5" onClick={postMark} ref={star5} />
      <label htmlFor="star-5" title={`${MARKS[lang]}«5»`}></label>
      <input type="radio" id="star-4" name="rating" value="4" onClick={postMark} ref={star4} />
      <label htmlFor="star-4" title={`${MARKS[lang]}«4»`}></label>
      <input type="radio" id="star-3" name="rating" value="3" onClick={postMark} ref={star3} />
      <label htmlFor="star-3" title={`${MARKS[lang]}«3»`}></label>
      <input type="radio" id="star-2" name="rating" value="2" onClick={postMark} ref={star2} />
      <label htmlFor="star-2" title={`${MARKS[lang]}«2»`}></label>
      <input type="radio" id="star-1" name="rating" value="1" onClick={postMark} ref={star1} />
      <label htmlFor="star-1" title={`${MARKS[lang]}«1»`}></label>
    </div>
  );
};
