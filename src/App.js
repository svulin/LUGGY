//https://studio.mapbox.com/
// https://www.pika.dev/packages/@urbica/react-map-gl
//https://github.com/uber/react-map-gl/blob/5.0-release/examples/interaction/src/marker-style.js
//https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md
//https://monumap.com/app/detail/514
//https://kassa.yandex.ru/developers/using-api/basics

import React, { useState, useEffect, Component} from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import * as placeData from "./data/places.json";


const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
}

// https://stackoverflow.com/questions/55766165/how-to-not-change-camera-center-upon-geolocatecontrol-trigger
// const locate = new ReactMapGL.GeolocateControl({
//   positionOptions: { enableHighAccuracy: true },
//   trackUserLocation: true
// })
// // hacky workaround for the fact that mapbox doesn't let you disable camera auto-tracking
// locate._updateCamera = () => {}
// this.map.addControl(locate)

function App() {
  const [viewport, setViewport] = useState({
    latitude: 55.7558,
    longitude: 37.6173,
    width: "100vw",
    height: "100vh",
    zoom: 10
  })
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [userLocation, SetUserLocation] = useState (null)
// navigator.geolocation.getCurrentPosition
  useEffect(() => { //для использования клавиатуры
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPlace(null);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100vw"
        height="100vh" 
        mapboxApiAccessToken='pk.eyJ1Ijoic2F1bGluIiwiYSI6ImNrMHQ4YXdnNzA1cHozY3FwcXducngzNGQifQ.I1n0Ecna664hDQ4PSh5d-w'
      //  mapStyle = 'mapbox://styles/saulin/ck0t9espm0f6p1cqzdug9il7d'
        onViewportChange = {viewport=>{
          setViewport(viewport) //для обновления крты. Присваиваем новое состояние
        }}
      >

      <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation ={true}
          fitBoundsOptions = {{maxZoom:10}}
          showUserLocation = {true}
//https://github.com/uber/react-map-gl/pull/761
      />
        {placeData.features.map(park => (
          <Marker 
            key={park.properties._ID}
            latitude = {park.geometry.coordinates[1]}
            longitude = {park.geometry.coordinates[0]}
          >
            <button 
              className = 'marker-btn'
              onClick = {e => {
                e.preventDefault()
                setSelectedPlace(park)
              }} 
            >
              <img src = '/bag.svg' alt='x'/>
            </button>
          </Marker>
        ))}
        {selectedPlace ? (//если парк выбран, то .., иначе null
          <Popup //отображlает всплывающие окна
            latitude = {selectedPlace.geometry.coordinates[1]}
            longitude = {selectedPlace.geometry.coordinates[0]}
            onClose = {() => {
              setSelectedPlace(null)
            }}
          >
            <div>
              <h2>{selectedPlace.properties.NAME}</h2>
              <p>{selectedPlace.properties.DESCRIPTION}</p>
			  <a href="https://yandex.ru/">pay</a>
            </div>
          </Popup>
        ):null }
      </ReactMapGL>
    </div>
  )
}

export default App 