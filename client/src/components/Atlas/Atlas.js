import React, {Component} from 'react';
import {Col, Container, Row, Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap';

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
                <Form>
                  <FormGroup>
                    <Label for="Location_1">Location 1</Label>
                    <Input type="Location_1" name="Location_1" id="ExampleLocation_1" placeholder="Longitude, Latitude" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Location_2">Location 2</Label>
                    <Input type="Location_2" name="Location_2" id="ExampleLocation_2" placeholder="Longitude, Latitude" />
                  </FormGroup>
                </Form>
                <Button color="primary" style = {this.findDistanceButtonStyle}>Find Distance</Button>{' '}
                {this.renderLeafletMap()}
              </Col>
              <Col sm={12} md={{size: 10, offset: 1}}>
                <Button color = "primary" style={this.buttonStyle} onClick={() => this.requestCurrentLocation()}>
                  Where Am I?
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }

  // where() {
  //   alert("Here!");
  // }
  //

  buttonStyle = {
    marginTop: 10
  }

  findDistanceButtonStyle = {
    marginBottom: 10
  }
  
  requestCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
          function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            console.log(position);
            },
          function(error) {
            console.error("Error Code = " + error.code + " - " + error.message);
            }
      );
      console.log("Available");
    } else {
      console.log("Not Available");
    }
  }

  renderLeafletMap() {
    return (
        <Map
            className={'mapStyle'}
            boxZoom={false}
            useFlyTo={true}
            zoom={15}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            maxBounds={MAP_BOUNDS}
            center={MAP_CENTER_DEFAULT}
            onClick={this.setMarker}
        >
          <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
          {this.getMarker()}
        </Map>
    );
  }

  setMarker(mapClickInfo) {
    this.setState({markerPosition: mapClickInfo.latlng});
  }

  getMarker() {
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    };

    if (this.state.markerPosition) {
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
