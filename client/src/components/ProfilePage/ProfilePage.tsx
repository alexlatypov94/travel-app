import React, { ReactElement, useCallback, useContext, useEffect, useRef, useState } from "react";
import "./ProfilePage.scss";
import { PreloaderMain } from "../Main/PreloaderMain";
import { ISwitchLang, LangContext, CHOOSE_FILE, HELLO } from "../../core";

export const ProfilePage = ({ logOutFn }): ReactElement => {
  const [isSended, setIsSended] = useState(true);
  const lang: any = useContext(LangContext);
  const [imgSrc, setImgSrc] = useState("");
  const [buffer, setBuffer] = useState("");
  const [save, setSave] = useState(false);

  const notUserPhoto: string = "../../../public/assets/img/no-photo.jpg";

  const saveImage = (e: any) => {
    setIsSended(false);
    setSave(true);
    const image: File = e.target.files[0];
    const fr: FileReader = new FileReader();
    fr.readAsDataURL(image);
    let buff: any;
    fr.onload = () => {
      const imageField: any = new Image();
      imageField.src = fr.result;
      buff = fr.result;
      setBuffer(buff);
      setIsSended(true);
    };
  };

  const handlerLogOut = () => {
    logOutFn();
  };

  useEffect(() => {
    if (isSended) {
      fetch("https://cryptic-lake-86056.herokuapp.com/save-image", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: window.localStorage.getItem("usermail"),
          image: buffer,
          save: save
        })
      })
        .then((resolve) => resolve.json())
        .then((data: any) => {
          if (data.url === "") {
            setImgSrc(notUserPhoto);
          } else {
            setImgSrc(data.url);
          }
        })
        .then(() => {
          setIsSended(false);
          if (save) {
            setSave(false);
          }
        });
    }
  }, [isSended]);

  return (
    <>
      {window.localStorage.username ? (
        <h1 className="user-name">
          {HELLO[lang]}, {window.localStorage.username}
        </h1>
      ) : (
        <h1 className="user-name">{HELLO[lang]}, Noname</h1>
      )}
      <div className={"main-info"}>{isSended ? <PreloaderMain /> : <img src={imgSrc} className="user-photo" />}</div>
      <div className="input__wrapper">
        <input
          type="file"
          onChange={saveImage}
          accept="image/jpeg,image/png,image/jpg"
          id="input__file"
          className="input input__file"
        />
        <label htmlFor="input__file" className="input__file-button">
          <span className="input__file-icon-wrapper">
            <img
              className="input__file-icon"
              src="./../../public/assets/img/download.svg"
              alt="Выбрать файл"
              width="25"
            />
          </span>
          <span className="input__file-button-text">{CHOOSE_FILE[lang]}</span>
        </label>
        <button className="log-out-btn" onClick={handlerLogOut}>
          Log Out
        </button>
      </div>
    </>
  );
};
