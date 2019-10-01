import React,{useState} from 'react' //useState - отлслеживает состояние маркера, на который кликнули на карте (открыт\закрыт)
https://uber.github.io/react-map-gl/#/
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import * as parkData from './data/skateboard-parks.json'
import mapStyles from './mapStyles'

function Map() {
  const [selectedPark,setSelectedPark] = useState (null) //ни на что не нажато и поэтому состояние null

  return ( 
  <GoogleMap
    defaultZoom = {10} 
    defaultCenter = {{ lat:45.4215, lng:-75.6972 }}
    defaultOptions = {{styles: mapStyles}}
  >
      {parkData.features.map(park => (
       <Marker 
          key = {park.properties.PARK_ID}
          position = {{
            lat:park.geometry.coordinates[1],
            lng:park.geometry.coordinates[0]
          }}
          onClick = {() =>{
            setSelectedPark(park)
          }}
          icon ={{
            url:'/placeholder.svg',
            scaledSize: new window.google.maps.Size(25,25)
          }}
        />
      ))}
      {selectedPark && (
        <InfoWindow
        position = {{
          lat:selectedPark.geometry.coordinates[1],
          lng:selectedPark.geometry.coordinates[0]
        }}
        onCloseClick = {()=>{
          setSelectedPark(null)
        }}
        >
          <div>
            <h4>{selectedPark.properties.NAME}</h4>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
  </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

function App() {
  return (
  <div 
  style = {{width: '100vw', height:'100vh'}}
  >
    <WrappedMap
    googleMapURL = {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDTPuj0iC1RO8EHNCTQ9t7s3MyqEbZH0H4`}
    loadingElement = {<div style = {{height: `100%`}}/>}
    containerElement = {<div style = {{height: `100%`}}/>}
    mapElement = {<div style = {{height: `100%`}}/>}
  />
  </div>
  )
}

export default App;


////&key=${process.env.REACT_APP_GOOGLE_KEY}
//https://www.youtube.com/watch?v=Pf7g32CwX_s

