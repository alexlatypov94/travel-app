import React, { ReactElement, useContext, useEffect, useState } from "react";
import { CHOOSE_FILE, HELLO, LangContext } from "./../../core";
import "./ProfilePage.scss";

export const ProfilePage = ({ logOutFn }: any): ReactElement => {
  const [isSended, setIsSended] = useState(false);
  const [imgSrc, setImgSrc] = useState("../../../public/assets/img/no-photo.jpg");
  const [form, setForm] = useState(undefined);
  const lang: any = useContext(LangContext);

  const saveImage = (e: any) => {
    if (e.target.files.length > 0) {
      setIsSended(true);
      const formData: FormData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("email", "batinhuy@gmail.com");
      setForm(formData);
    }
  };

  const handlerLogOut = () => {
    logOutFn();
  };

  useEffect(() => {
    if (isSended) {
      fetch("http://localhost:3001/api/save-image", {
        method: "POST",
        body: form
      })
        .then((resolve) => resolve.json())
        .then((data: any, url: any) => {
          setImgSrc(url);
          window.localStorage.setItem("image", data.url);
        })
        .then(() => {
          setIsSended(false);
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
