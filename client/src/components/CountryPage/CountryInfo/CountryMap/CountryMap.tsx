import React, { ReactElement } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";

import "./CountryMap.scss";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import { POLYGONS } from "./../../../../core";

export const CountryMap = (props: any): ReactElement => {
  const reArea: Array<Array<number>> = POLYGONS[props.country.country].map((element: Array<number>) => {
    const array: Array<number> = [];
    element.map((x) => array.unshift(x));
    return array;
  });

  const DefaultIcon: any = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  const position: any = props.country.countryCoordinate;
  return (
    <MapContainer style={{ width: "100%", height: "100%" }} fullscreenControl={true} center={position} zoom={7}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
      <FeatureGroup pathOptions={{ color: "red" }}>
        <Polygon pathOptions={{ color: "purple" }} positions={reArea} />
      </FeatureGroup>
    </MapContainer>
  );
};
