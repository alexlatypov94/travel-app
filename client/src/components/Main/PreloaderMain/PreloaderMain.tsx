import React, { ReactElement, useContext } from "react";
import "./PreloaderMain.scss";

export const PreloaderMain = (props: any): ReactElement => {
  return (
    <div className="preloader-main">
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>
      <div className="circle circle-5"></div>
    </div>
  );
};
