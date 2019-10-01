import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './Map';


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div 
  style = {{width: '100vw', height:'100vh'}}
  >
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        {<Marker
              icon={{
                url: `https://img.icons8.com/color/96/000000/sphere.png`,
                scaledSize: new window.google.maps.Size(25, 25)
              }}
        />}
        {/* <Marker onClick={this.onMarkerClick} name={'current location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow> */}
      </CurrentLocation>


      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyCKAN6fTGh5E7IBMDHULe-JQkJJcIeM0_Q'
})(MapContainer);