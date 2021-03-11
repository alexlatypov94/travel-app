import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./AuthPage.scss";

export const AuthPage = (props: any): ReactElement => {
  const mail: any = useRef("");
  const psswrd: any = useRef("");
  const img: any = useRef("");
  const regUrl: string = "http://localhost:3001/api/register";
  const logUrl: string = "http://localhost:3001/api/login";
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [isSended, setIsSended] = useState(false);
  const [isLog, setIsLog] = useState(true);
  const [isReg, setIsReg] = useState(false);
  const [url, setUrl] = useState(logUrl);

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
        .then(() => {
          setIsSended(false);
        });
    }
  }, [isSended]);
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
      <div className={"mail"}>
        <label htmlFor={"mail"}>E-mail</label>
        <input type="text" id={"mail"} ref={mail} placeholder={"Enter e-mail"} />
      </div>
      <div className={"pass"}>
        <label htmlFor={"password"}>Password</label>
        <input type="text" id={"password"} ref={psswrd} placeholder={"Enter password"} />
      </div>
      <input type="submit" onClick={postData} />
      {data && !isSended ? props.redirect() : <h2>not entered</h2>}
    </div>
  );
};
