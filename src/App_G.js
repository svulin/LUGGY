//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/

import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as placeData from "./data/places.json";
import mapStyles from "./mapStyles";

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 55.7558, lng: 37.6173 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {placeData.features.map(park => (
        <Marker
          key={park.properties._ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            url: `/bag.svg`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTION}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}


function myLocation () {

}

const MapWrapped = withScriptjs(withGoogleMap(Map));


export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCKAN6fTGh5E7IBMDHULe-JQkJJcIeM0_Q`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
	  
    </div>
  );
}
//https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/