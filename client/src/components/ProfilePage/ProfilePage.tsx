import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import "./ProfilePage.scss";

export const ProfilePage = (props: any): ReactElement => {
  const [isSended, setIsSended] = useState(false);
  const [imgSrc, setImgSrc] = useState("../../../public/assets/img/no-photo.jpg");
  const [form, setForm] = useState(undefined);

  const saveImage = (e: any) => {
    if (e.target.files.length > 0) {
      setIsSended(true);
      const formData: FormData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("email", "batinhuy@gmail.com");
      setForm(formData);
    }
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
        })
        .then(() => {
          setIsSended(false);
        });
    }
  }, [isSended]);

  return (
    <div className={"profile-page"}>
      {window.localStorage.username ? <h3>Hello, {window.localStorage.username}</h3> : <input type="text" />}
      <div className={"main-info"}>
        <img src={imgSrc} />
        <input type="file" onChange={saveImage} accept="image/jpeg,image/png,image/jpg" />
      </div>
    </div>
  );
};
