import React, { ReactElement, useEffect, useState } from "react";
import "./ProfilePage.scss";

export const ProfilePage = (): ReactElement => {
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
        <h1 className="user-name">Hello, {window.localStorage.username}</h1>
      ) : (
        <input type="text" />
      )}
      <div className="main-info">
        <img className="user-photo" src={imgSrc} alt="" />
        <input type="file" onChange={saveImage} accept="image/jpeg,image/png,image/jpg" />
      </div>
    </>
  );
};
