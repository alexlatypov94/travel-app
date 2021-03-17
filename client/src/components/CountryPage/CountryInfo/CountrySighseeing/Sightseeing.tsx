import React, { ReactElement, useContext } from "react";
import "./Sightseeing.scss";
import Gallery from "react-grid-gallery";
import { LangContext } from "../../../../core";

export const Sightseeing = ({ currentCountry }: any): ReactElement => {
  const lang: any = useContext(LangContext);

  const IMG: any = currentCountry.map((el: any) => {
    return {
      src: el?.attractionsImg,
      thumbnail: el?.attractionsImg,
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      caption: el?.attractionsDescr?.[lang],
      thumbnailCaption: <span>{el?.attractionsName?.[lang]}</span>
    };
  });

  return (
    <div
      style={{
        display: "block",
        height: "100%",
        width: "100%",
        overflow: "auto",
        textAlign: "center",
        fontSize: "14px",
        lineHeight: "28px"
      }}
    >
      <Gallery
        style={{
          display: "flex",
          fontSize: "15px"
        }}
        images={IMG}
      />
    </div>
  );
};
