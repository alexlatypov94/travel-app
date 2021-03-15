
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { CHOOSE_FILE, HELLO, LangContext } from "./../../core";
import "./ProfilePage.scss";


export const ProfilePage = ({ logOutFn }: any): ReactElement => {

  const [isSended, setIsSended] = useState(true);
  const [imgSrc, setImgSrc] = useState("");
  const [buffer, setBuffer] = useState("");
  const [save, setSave] = useState(false);
  const lang: any = useContext(LangContext);

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
      fetch("http://localhost:3001/api/save-image", {
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
          window.localStorage.setItem("image", data.url);
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
      <div className="main-info">
        <img className="user-photo" src={imgSrc} alt="" />
      </div>

      <div className="input__wrapper">
        <input
          type="file"
          onChange={saveImage}
          accept="image/jpeg,image/png,image/jpg"
          id="input__file"
          className="input input__file"
          multiple
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
