//https://studio.mapbox.com/
// https://www.pika.dev/packages/@urbica/react-map-gl
//https://github.com/uber/react-map-gl/blob/5.0-release/examples/interaction/src/marker-style.js
//очень хороший стиль у этой карты
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
  const [selectedPark, setSelectedPark] = useState(null)
  const [userLocation, SetUserLocation] = useState (null)
// navigator.geolocation.getCurrentPosition
  useEffect(() => { //для использования клавиатуры
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
                setSelectedPark(park)
              }} 
            >
              <img src = '/bag.svg' alt='x'/>
            </button>
          </Marker>
        ))}
        {selectedPark ? (//если парк выбран, то .., иначе null
          <Popup //отображlает всплывающие окна
            latitude = {selectedPark.geometry.coordinates[1]}
            longitude = {selectedPark.geometry.coordinates[0]}
            onClose = {() => {
              setSelectedPark(null)
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTION}</p>
            </div>
          </Popup>
        ):null }
      </ReactMapGL>
    </div>
  )
}

export default App 