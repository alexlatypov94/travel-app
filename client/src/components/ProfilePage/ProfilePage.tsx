import React, { ReactElement, useCallback, useContext, useEffect, useRef, useState } from "react";
import "./ProfilePage.scss";
import { PreloaderMain } from "../Main/PreloaderMain";
import { ISwitchLang, LangContext, UPLOAD } from "../../core";

export const ProfilePage = (props: any): ReactElement => {
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
    <div className={"profile-page"}>
      {window.localStorage.username ? <h3>Hello, {window.localStorage.username}</h3> : <input type="text" />}
      <div className={"main-info"}>
        {isSended ? <PreloaderMain /> : <img src={imgSrc} />}
        <input type="file" onChange={saveImage} id="image" accept="image/jpeg,image/png,image/jpg" />
        <label htmlFor="image">
          <img src={"../../public/assets/img/upload.svg"} />
          <p>| {UPLOAD[lang]}</p>
        </label>
      </div>
    </div>
  );
};
