import React, { ReactElement } from "react";
import YouTube from "react-youtube";
import "./CountryVideo.scss";

export const CountryVideo = ({ video }: any): ReactElement => {
  const opts: any = {
    width: "100%",
    height: "100%"
  };

  return (
    <div className="vidos">
      <YouTube videoId={video} opts={opts} />
    </div>
  );
};
