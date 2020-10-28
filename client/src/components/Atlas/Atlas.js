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
        this.setMarker = this.setMarker.bind(this);
        this.addMarkersToMap = this.addMarkersToMap.bind(this);
        this.clearAllMarkers = this.clearAllMarkers.bind(this);
        this.handleChangeLatitude = this.handleChangeLatitude.bind(this);
        this.handleChangeLongitude = this.handleChangeLongitude.bind(this);
        this.handleCoordinateSubmit = this.handleCoordinateSubmit.bind(this);
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
                             <OurMap markerPositions = {this.state.markerPositions} requestCurrentLocation = {this.requestCurrentLocations} setMarker = {this.setMarker}/>
                             <ClearButton style = {this.buttonStyleTop} clearAllMarkers= {this.clearAllMarkers}/>
                             <ItineraryButton style = {this.buttonStyleTopLeft}  placesForItinerary = {this.state.placesForItinerary}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    /* MAP BUTTONS */

    clearAllMarkers() {
        this.setState({markerPositions: []});
        this.setState({placesForItinerary: []});
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

    handleCoordinateSubmit() {
        this.addMarkersToMap("User's Typed Coordinates", this.state.lat1, this.state.lng1);
    }

    handleChangeLatitude = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeLongitude = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    /* END OF ADD LOCATION BY COORDINATES COMPONENT */

    requestCurrentLocation() {
        self = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    self.addMarkersToMap("Home", position.coords.latitude, position.coords.longitude);
                },
                function (error) {
                    console.error("Error Code = " + error.code + " - " + error.message);
                });
        } else {!
            console.error("Not Available");
        }
    }

    addMarkersToMap(placeName, lat, long) {
        let coords = L.latLng(lat, long);
        this.setState({ markerPositions: [...this.state.markerPositions, coords]});
        this.setState({ placesForItinerary: [...this.state.placesForItinerary, {name: placeName, latitude: coords.lat + '', longitude: coords.lng + ''}]});
        var distances = [0];
        var i;
        for (i = 1; i < this.state.placesForItinerary.length; i++) {
            let data = {
                requestType: "distance",
                requestVersion: 3,
                place1: this.state.placesForItinerary[i - 1],
                place2: this.state.placesForItinerary[i],
                earthRadius: 3959.0
            }
            sendServerRequest(data).then(trip => {
                if (!trip) {
                    distances.push(-1);
                }
                distances.push(trip.data.distance);
            });
        }
        this.setState({distances: distances});
        <OurMap markerPositions = {this.state.markerPositions} requestCurrentLocation = {this.requestCurrentLocations}  setMarker = {this.setMarker}/>

    }


//    renderLeaflet() {
//        let map_center;
//        let fit_bounds;
//        let zoom = 15;
//
//        if (this.state.markerPositions.length != 0) {
//            let sortedMarkerPositions = [...this.state.markerPositions].sort((a, b) => (a.lng > b.lng) ? 1 : -1);
//
//            if (sortedMarkerPositions.length == 1) {
//                map_center = [sortedMarkerPositions[0].lat, sortedMarkerPositions[0].lng];
//                zoom = 17;
//            } else {
//                fit_bounds = L.latLngBounds(sortedMarkerPositions[0], sortedMarkerPositions[sortedMarkerPositions.length - 1]);
//            }
//        } else {
//            map_center = MAP_CENTER_DEFAULT;
//            this.requestCurrentLocation();
//        }
//
//        var points = [];
//            this.state.markerPositions.forEach((position) => {
//            points.push([position.lat, position.lng])
//            }
//        );
//
//
//        return (
//            <Map className={'mapStyle'}
//                 boxZoom={false}
//                 zoom={zoom}
//                 minZoom={MAP_MIN_ZOOM}
//                 maxZoom={MAP_MAX_ZOOM}
//                 maxBounds={MAP_BOUNDS}
//                 center={map_center}
//                 bounds={fit_bounds}
//                 boundsOptions={{padding: [50, 50]}}
//                 onClick={this.setMarker}
//                 useFlyTo={true}
//                 maxBoundsViscosity={1.0}>
//                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
//                {this.getMarker()}
//                {this.drawLines(points)}
//            </Map>
//        );
//    }

    setMarker(mapClickInfo) {
        this.addMarkersToMap("mapClickInfo", mapClickInfo.latlng);
    }

    getMarker() {
        const initMarker = ref => {
            if (ref) {
                ref.leafletElement.openPopup()
            }
        };

        if (this.state.markerPositions.length > 1) {
            return (
                this.state.markerPositions.map((position, idx) =>
                    <Marker ref={initMarker} key={`marker-${idx}`} position={position} icon={MARKER_ICON}>
                        <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
                    </Marker>
                )
            );
        } else {
            return (
                this.state.markerPositions.map((position, idx) =>
                    <Marker ref={initMarker} key={`marker-${idx}`} position={position} icon={CURR_LOC_MARKER_ICON}>
                        <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
                    </Marker>
                )
            );
        }
    }

    getStringMarkerPosition(markerPos) {
        return markerPos.lat.toFixed(2) + ', ' + markerPos.lng.toFixed(2);
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