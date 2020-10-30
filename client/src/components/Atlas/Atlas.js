import React, {Component} from 'react';
import { Col, Container, Row, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import currentLocationIcon from '../../static/images/home-marker-icon.png';
import classnames from 'classnames';
import 'leaflet/dist/leaflet.css';

import {sendServerRequest} from "../../utils/restfulAPI";
import {Polyline} from 'react-leaflet';
import ClearButton from './ClearButton';
import ItineraryButton from './ItineraryButton';
import AddLocation from './AddLocation';
import SearchPlaces from './SearchPlaces'
import OurMap from './Map'

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const CURR_LOC_MARKER_ICON = L.icon({iconUrl: currentLocationIcon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const EARTH_RADIUS = 3959;

export default class Atlas extends Component {

    buttonStyleTopLeft = {
       marginTop: 10,
       marginLeft: 10,
    }

    buttonStyleBottoms = {
        marginBottom: 10
    }

    buttonStyleTop = {
        marginTop: 10
    }

    constructor(props) {
        super(props);
        this.addMarkersToMap = this.addMarkersToMap.bind(this);
        this.clearAllMarkers = this.clearAllMarkers.bind(this);
        this.requestCurrentLocation = this.requestCurrentLocation(this);

        this.state = {
            markerPosition:null,
            markerPositions: [],
            activeTab: '1',
            placesForItinerary: [],
            lat1: 0,
            lng1: 0
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            {this.renderTabs()}
                             <OurMap markerPositions = {this.state.markerPositions}
                                     requestCurrentLocation = {this.requestCurrentLocations}
                                     addMarkersToMap = {this.addMarkersToMap}/>
                             <ClearButton style = {this.buttonStyleTop}
                                          clearAllMarkers= {this.clearAllMarkers}
                                          markerPositions = {this.state.markerPositions}
                                          requestCurrentLocation = {this.requestCurrentLocations}
                                          addMarkersToMap = {this.addMarkersToMap}/>
                             <ItineraryButton style = {this.buttonStyleTopLeft}
                                              placesForItinerary = {this.state.placesForItinerary}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    /* MAP BUTTONS */

    clearAllMarkers(){
        this.setState({markerPositions: []});
        this.setState({placesForItinerary: []});
        console.log(this.state.markerPositions);
        this.requestCurrentLocation;
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({activeTab: tab});
        }
    }

    renderTabs() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '1'})} onClick={() => {this.toggle('1');}}>
                            Add Location
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {this.toggle('2');}}>
                            Search Places
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <AddLocation style={this.buttonStyleBottom} handleCoordinateSubmit = {this.handleCoordinateSubmit}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <SearchPlaces addMarkersToMap = {this.addMarkersToMap}/>
                    </TabPane>
                </TabContent>
            </div>
        )
    }

    requestCurrentLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    this.addMarkersToMap("Home", position.coords.latitude, position.coords.longitude);
                },
                function (error) {
                    console.error("Error Code = " + error.code + " - " + error.message);
                },this);
        } else {!
            console.error("Not Available");
        }
    }

    addMarkersToMap(placeName, lat, long) {
        let coords = L.latLng(lat, long);
        this.setState({ markerPositions: [...this.state.markerPositions, coords]});
        this.setState({ placesForItinerary: [...this.state.placesForItinerary, {name: placeName, latitude: coords.lat + '', longitude: coords.lng + ''}]});
//        var distances = [0];
//        var i;
//        for (i = 1; i < this.state.placesForItinerary.length; i++) {
//            let data = {
//                requestType: "distance",
//                requestVersion: 3,
//                place1: this.state.placesForItinerary[i - 1],
//                place2: this.state.placesForItinerary[i],
//                earthRadius: 3959.0
//            }
//            sendServerRequest(data).then(trip => {
//                if (!trip) {
//                    distances.push(-1);
//                }
//                distances.push(trip.data.distance);
//            });
//        }
//        this.setState({distances: distances});
//        <OurMap markerPositions = {this.state.markerPositions} requestCurrentLocation = {this.requestCurrentLocations}  setMarker = {this.setMarker}/>
    }



    drawLines(points){
        if (points.length > 1 ){
            return (
               <Polyline positions={points} color='red'/>
            );
        }
        return null
    }
}