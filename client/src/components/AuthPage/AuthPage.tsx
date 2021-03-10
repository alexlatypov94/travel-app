import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";

export const AuthPage = (): ReactElement => {
  const mail: any = useRef("");
  const psswrd: any = useRef("");
  const img: any = useRef("");
  const regUrl: string = "http://localhost:3001/api/register";
  const logUrl: string = "http://localhost:3001/api/login";
  const imgUrl: string = "http://localhost:3001/api/save-image";
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [reqOpt, setReqOpt] = useState(undefined);
  const [isSended, setIsSended] = useState(false);
  const [isLog, setIsLog] = useState(true);
  const [isReg, setIsReg] = useState(false);
  const [url, setUrl] = useState(logUrl);
  const [buffer, setBuffer] = useState("");

  const uploadImg = () => {
    const selFile: File = img.current.files[0];
    const reader: any = new FileReader();
    reader.readAsDataURL(selFile);
    reader.onload = (e: any) => {
      const image: any = new Image();
      image.src = e.target?.result;
      console.log(image.src);
      setUrl(imgUrl);
      setBuffer(image.src);
      setIsSended(true);
    };
  };

  const logMode = () => {
    setIsLog(true);
    setIsReg(false);
    setUrl(logUrl);
  };
  const regMode = () => {
    setIsReg(true);
    setIsLog(false);
    setUrl(regUrl);
  };

  const postData = () => {
    console.log(url);
    setIsSended(true);
    setEmail(mail.current.value);
    setPassword(psswrd.current.value);
  };

  useEffect(() => {
    if (isSended) {
      setEmail(mail.current.value);
      setPassword(psswrd.current.value);
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          image: buffer
        })
      })
        .then((resolve) => resolve.json())
        .then((data) => {
          setData(data.message);
          if (isLog) {
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("user", email);
            window.localStorage.setItem("user", data.username);
          }
        })
        .then(() => setIsSended(false));
    }
  }, [isSended]);
  console.log(isSended);
  return (
    <div className={"auth-page"}>
      <div className={"chooser"}>
        <button className={"sign-in"} onClick={regMode}>
          Sign up
        </button>
        <button className={"log-in"} onClick={logMode}>
          Sign in
        </button>
      </div>
      <label htmlFor={"mail"}>E-mail</label>
      <input type="text" id={"mail"} ref={mail} />
      <label htmlFor={"password"}>Password</label>
      <input type="text" id={"password"} ref={psswrd} />
      <input type="submit" onClick={postData} />
      {data && !isSended ? <h2>{data}</h2> : <h2>not entered</h2>}
      <input type="file" ref={img} onChange={uploadImg} accept=".jpeg .jpg .png"></input>
    </div>
  );
};
