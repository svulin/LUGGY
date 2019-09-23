//https://studio.mapbox.com/
// https://www.pika.dev/packages/@urbica/react-map-gl

//https://github.com/uber/react-map-gl/blob/5.0-release/examples/interaction/src/marker-style.js
//очень хороший стиль у этой карты
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import * as parkDate from "./data/skateboard-parks.json";


const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
}

function App() {
  const [viewport, setViewport] = useState({
    latitude: 55.7558,
    longitude: 37.6173,
    width: "100vw",
    height: "100vh",
    zoom: 10
  })
  const [selectedPark, setSelectedPark] = useState(null);

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
        mapboxApiAccessToken='pk.eyJ1Ijoic2F1bGluIiwiYSI6ImNrMHQ4YXdnNzA1cHozY3FwcXducngzNGQifQ.I1n0Ecna664hDQ4PSh5d-w'
        //mapStyle = 'mapbox://styles/saulin/ck0t9espm0f6p1cqzdug9il7d'
        onViewportChange = {viewport=>{
          setViewport(viewport) //для обновления крты. Присваиваем новое состояние
        }}
      >
      <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          fitBoundsOptions = {{maxZoom:5}}
        />
        {parkDate.features.map(park => (
          <Marker 
            key={park.properties.PARK_ID}
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
              <img src = '/idea.svg' alt='x'/>
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
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ):null }
      </ReactMapGL>
    </div>
  )
}

export default App