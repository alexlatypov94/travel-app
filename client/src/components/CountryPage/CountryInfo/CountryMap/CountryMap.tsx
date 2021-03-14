import React, { ReactElement } from "react";
import {MapContainer , TileLayer, Marker, Popup, Polygon, FeatureGroup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'

import "./CountryMap.scss";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';


const area = [[
  -7.399291992187501,
  37.18767264916781
],
  [
    -7.516021728515624,
    37.58267747761301
  ],
  [
    -7.253723144531249,
    37.97668004819228
  ],
  [
    -7.102661132812499,
    38.038357297980816
  ],
  [
    -7.003784179687499,
    38.024295124443995
  ],
  [
    -6.939239501953125,
    38.212288054388175
  ],
  [
    -7.087554931640624,
    38.174512274922485
  ],
  [
    -7.326507568359375,
    38.424545962509164
  ],
  [
    -7.3333740234375,
    38.4369174496712
  ],
  [
    -7.245826721191406,
    38.62545397209084
  ],
  [
    -7.27294921875,
    38.638327308061875
  ],
  [
    -7.2585296630859375,
    38.72676890113017
  ],
  [
    -7.042236328124999,
    38.87767045390622
  ],
  [
    -6.954345703125,
    39.02878566149626
  ],
  [
    -7.04498291015625,
    39.11727568585598
  ],
  [
    -7.1356201171875,
    39.10662011662115
  ],
  [
    -7.13836669921875,
    39.17052936145295
  ],
  [
    -7.241363525390626,
    39.21310328979648
  ],
  [
    -7.54486083984375,
    39.65434146406167
  ],
  [
    -7.02301025390625,
    39.67125632523974
  ],
  [
    -6.87744140625,
    40.002371935876475
  ],
  [
    -6.998291015625,
    40.12639098502455
  ],
  [
    -7.02301025390625,
    40.199854889057676
  ],
  [
    -6.95709228515625,
    40.24808787647333
  ],
  [
    -6.78955078125,
    40.35910267579199
  ],
  [
    -6.913146972656249,
    41.025499378313754
  ],
  [
    -6.207275390625,
    41.582579601430346
  ],
  [
    -6.429748535156249,
    41.68522004222073
  ],
  [
    -6.5093994140625,
    41.66470503009207
  ],
  [
    -6.57806396484375,
    41.734429390721
  ],
  [
    -6.51763916015625,
    41.86547012230937
  ],
  [
    -6.56982421875,
    41.881831370505594
  ],
  [
    -6.580810546874999,
    41.96561702568286
  ],
  [
    -6.951599121093749,
    41.947234477977766
  ],
  [
    -7.14385986328125,
    41.98807738309159
  ],
  [
    -7.18231201171875,
    41.96357478222518
  ],
  [
    -7.193298339843749,
    41.89205502378826
  ],
  [
    -7.415771484374999,
    41.812267143599804
  ],
  [
    -8.1683349609375,
    41.81636125072054
  ],
  [
    -8.228759765625,
    41.902277040963696
  ],
  [
    -8.096923828125,
    42.037054301883806
  ],
  [
    -8.2012939453125,
    42.13896840458089
  ],
  [
    -8.887939453125,
    41.86137915587359
  ],
  [
    -8.6572265625,
    40.93426521177941
  ],
  [
    -9.481201171875,
    38.676933444637925
  ],
  [
    -9.2559814453125,
    38.67264490154078
  ],
  [
    -9.2010498046875,
    38.41486245064945
  ],
  [
    -8.85498046875,
    38.47079371120379
  ],
  [
    -8.800048828125,
    38.07836562996712
  ],
  [
    -8.9703369140625,
    37.01132594307015
  ],
  [
    -8.61328125,
    37.112145754751516
  ],
  [
    -8.162841796875,
    37.09023980307208
  ],
  [
    -7.888183593749999,
    36.96306042436515
  ],
  [
    -7.4102783203125,
    37.17782559332976
  ]];


let DefaultIcon = L.icon({
  ...L.Icon.Default.prototype.options,
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

export const CountryMap = ({ coord }: any): ReactElement => {
  const position: any = coord;
console.log(position)
  return (
    <MapContainer style={{width: '100%',height: '100%'}} fullscreenControl={true} center={position} zoom={7}>

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"


      />
      <Marker position={position} >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <FeatureGroup pathOptions={{ color: 'red' }} >


        <Polygon pathOptions={{ color: 'purple' }} positions={area}/>
      </FeatureGroup>

    </MapContainer>
  );
};

