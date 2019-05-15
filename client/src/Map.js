import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { MAP_API_KEY } from './key';

const mapStyles = {
    width: '100%',
    height: '100%'
  };
  
  export class MapContainer extends Component {
    render() {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
           lat: 47.6062,
           lng: -122.335167
          }}
        />
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: MAP_API_KEY
  })(MapContainer);