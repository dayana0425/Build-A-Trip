import React, {Component} from 'react';
import {Col, Container, Row, Button} from 'reactstrap';
import Tabs from './Tabs.js'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40] });
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default class Atlas extends Component {

  constructor(props) {
    super(props);
    this.setMarker = this.setMarker.bind(this);
    this.state = {
      markerPosition: null,
    };
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 10, offset: 1}}>
                <Tabs> </Tabs>
                {this.renderLeafletMap()}
                <Button color = "primary" style={this.buttonStyle} onClick={() => this.requestCurrentLocation()}>
                  Where Am I?
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }

  buttonStyle = {
    marginTop: 10
  }

  requestCurrentLocation() {
    self = this;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
              self.setState({markerPosition: L.latLng(position.coords.latitude, position.coords.longitude)});
              self.setMarker();
            },
            function(error) {
              console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
    } else {
              console.log("Not Available");
    }
  }

  renderLeafletMap() {
      let map_center;
      let zoom = 15;
      if (this.state.markerPosition == null){
          map_center = MAP_CENTER_DEFAULT;
      }
      else {
          map_center = [this.state.markerPosition.lat, this.state.markerPosition.lng];
          zoom = 17;
      }

    return (
        <Map
            className={'mapStyle'}
            boxZoom={false}
            useFlyTo={true}
            zoom={zoom}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            maxBounds={MAP_BOUNDS}
            center={map_center}
            onClick={this.setMarker}
        >
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          {this.getMarker()}
        </Map>
    );
  }

  setMarker(mapClickInfo) {
    console.log(mapClickInfo);
    this.setState({markerPosition: mapClickInfo.latlng});
  }

  getMarker() {
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    };

    if (this.state.markerPosition) {
      console.log(this.state.markerPosition);
      return (
          <Marker ref={initMarker} position={this.state.markerPosition} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition()}</Popup>
          </Marker>
      );
    }
  }

  getStringMarkerPosition() {
    return this.state.markerPosition.lat.toFixed(2) + ', ' + this.state.markerPosition.lng.toFixed(2);
  }

}