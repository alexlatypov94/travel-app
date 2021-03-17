import React, { ReactElement, useRef, useState } from "react";
import "./Footer.scss";

export const Footer = (): ReactElement => {
  const devOpsList: any = useRef(undefined);
  const [devsCheck, setDevsCheck] = useState(true);
  const handlerShowDevOps = () => {
    devOpsList.current.classList.toggle("active-dev", devsCheck);
    setDevsCheck(!devsCheck);
  };
  return (
    <footer>
      <ul ref={devOpsList} className="footer-devs-list">
        <li className="dev-item">
          <a href="https://github.com/alexlatypov94">
            <object data="../../../public/assets/img/github.svg" type="image/svg+xml" />
            <h3>Aliaksei Latypau</h3>
          </a>
        </li>
        <li className="dev-item">
          <a href="https://github.com/blackymax">
            <object data="../../../public/assets/img/github.svg" type="image/svg+xml" />
            <h3>Maxim Charnou</h3>
          </a>
        </li>
        <li className="dev-item">
          <a href="https://github.com/Gurnick013">
            <object data="../../../public/assets/img/github.svg" type="image/svg+xml" />
            <h3>Nickolay Gurinovich</h3>
          </a>
        </li>
      </ul>
      <button className="devs-btn" onClick={handlerShowDevOps}>
        &#10148;
      </button>
      <span className="footer-year">2021</span>
      <object
        className="footer-rs-logo"
        data="../../../public/assets/img/rs_school_js.svg"
        type="image/svg+xml"
      ></object>
    </footer>
  );
};
