import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./AuthPage.scss";

export const AuthPage = (props: any): ReactElement => {
  const mail: any = useRef();
  const psswrd: any = useRef();
  const usrnm: any = useRef();
  const regUrl: string = "https://cryptic-lake-86056.herokuapp.com/api/register";
  const logUrl: string = "https://cryptic-lake-86056.herokuapp.com/api/login";

  const autUrl: string = "https://cryptic-lake-86056.herokuapp.com/api/auth";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(undefined);
  const [username, setUsername] = useState("anonimuser");
  const [data, setData] = useState(undefined);
  const [isSended, setIsSended] = useState(false);
  const [isLog, setIsLog] = useState(true);
  const [isReg, setIsReg] = useState(false);
  const [isEntry, setIsEntry] = useState(false);
  const [url, setUrl] = useState(logUrl);

  const [bg, setBg] = useState("");
  const [err, setError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const userObjText: any = {
    en: "Username",
    ru: "Имя пользователя",
    es: "Nombre de usuario"
  };
  const passObjText: any = {
    en: "Password",
    ru: "Пароль",
    es: "Contrasena"
  };
  const sendObjText: any = {
    en: "Send",
    ru: "Отправить",
    es: "Enviar"
  };
  const infoObjText: any = {
    en: "Enter your information",
    ru: "Введите информацию",
    es: "Ingrese su informacion"
  };

  const handlerWithoutReg = (e) => {
    e.preventDefault();
    props.withoutRegFn();
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
    setEmail(mail.current.value);
    setPassword(psswrd.current.value);
    if (isReg) {
      setUsername(usrnm.current.value);
    } else {
      setUsername(window.localStorage.getItem("username")!);
    }
    setIsSended(true);
  };

  useEffect(() => {
    fetch(autUrl, {
      method: "POST",
      body: JSON.stringify({
        token: window.localStorage.getItem("token")
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        return data.answer ? props.handler(true) : props.handler(false);
      });

    if (isLog) {
      setBg("rgba(241, 186, 231, 0.534)");
    } else {
      setBg("rgba(240, 239, 189, 0.534)");
    }
    if (isSended) {
      setEmail(mail.current.value);
      setPassword(psswrd.current.value);
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
          token: window.localStorage.getItem("token")
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(
          (resolve) => resolve.json(),
          (reject) => setIsSended(false)
        )
        .then(
          (data) => {
            setData(data.message[props.lang]);
            if (data.token || data.password) {
              setIsEntry(true);
              if (isLog) {
                window.localStorage.setItem("token", data.token);
              }
              window.localStorage.setItem("usermail", email);
              window.localStorage.setItem("username", data.username);
              window.localStorage.setItem("image", data.image);
            } else {
              setError(true);
            }
          },
          (errors) => {
            setError(false);
            setIsSended(false);
          }
        )
        .then(() => {
          setIsSended(false);
          setError(true);
        });
    }
  }, [isSended, isLog]);

  return (
    <div className={"auth-page"} style={{ backgroundColor: bg }}>
      <div className={"chooser"}>
        <button className={isReg ? "sign-up active" : "sign-up"} onClick={regMode}>
          Sign up
        </button>

        <button className={isLog ? "log-in active" : "log-in"} onClick={logMode}>
          Sign in
        </button>
      </div>
      {isReg && (
        <div className={"username"}>
          <label htmlFor={"username"}>{userObjText[props.lang]}</label>

          <input type="email" id={"username"} ref={usrnm} placeholder={"Enter username"} />
        </div>
      )}
      <div className={"mail"}>
        <label htmlFor={"mail"}>E-mail</label>

        <input type="email" id={"mail"} ref={mail} placeholder={"Enter e-mail"} />
      </div>
      <div className={"pass"}>
        <label htmlFor={"password"}>{passObjText[props.lang]}</label>

        <input type="password" id={"password"} ref={psswrd} placeholder={"Enter password"} />
      </div>

      <input type="submit" className={"submit-btn"} onClick={postData} value={sendObjText[props.lang]} />

      {!isReg && (
        <a href="#" className="without-reg" onClick={handlerWithoutReg}>
          continue without registration
        </a>
      )}
    </div>
  );
};
