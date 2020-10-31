import React, {Component} from 'react';
import { Col, Container, Row, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import {sendServerRequest} from "../../utils/restfulAPI";
import ClearButton from './ClearButton';
import ItineraryButton from './ItineraryButton';
import AddLocation from './AddLocation';
import SearchPlaces from './SearchPlaces'
import OurMap from './Map'

const MAP_CENTER_DEFAULT = [40.5734, -105.0865];

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
            zoom:15,
            map_center: MAP_CENTER_DEFAULT,
            fit_bounds: null,
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
                             <OurMap map_center = {this.state.map_center}
                                     fit_bounds = {this.state.fit_bounds}
                                     zoom = {this.state.zoom}
                                     markerPositions = {this.state.markerPositions}
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
        self = this
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    self.addMarkersToMap("Home", position.coords.latitude, position.coords.longitude);
                },
                function (error) {
                    console.error("Error Code = " + error.code + " - " + error.message);
                },this);
        } else {!
            console.error("Not Available");
        }
    }

    getBounds(coords){
        console.log(coords)
        let sortedMarkerPositions = [coords]
        if (this.state.markerPositions.length != 0) {
            sortedMarkerPositions = [...this.state.markerPositions].sort((a, b) => (a.lng > b.lng) ? 1 : -1);
            console.log(this.state.markerPositions)
                if (sortedMarkerPositions.length == 1) {
                     this.setState({map_center:[sortedMarkerPositions[0].lat, sortedMarkerPositions[0].lng]});
                     this.setState({zoom:15});
                }
                else {
                     console.log(sortedMarkerPositions)
                     this.setState({fit_bounds:L.latLngBounds(sortedMarkerPositions[0], sortedMarkerPositions[sortedMarkerPositions.length - 1])});
                }
             }
            else {
               this.setState({map_center: MAP_CENTER_DEFAULT});
               this.requestCurrentLocation();
            }
    }

    addMarkersToMap(placeName, lat, long) {
        let coords = L.latLng(lat, long);
        console.log(coords)
        this.setState({ markerPositions: [...this.state.markerPositions, coords]});
        this.setState({ placesForItinerary: [...this.state.placesForItinerary, {name: placeName, latitude: coords.lat + '', longitude: coords.lng + ''}]});
        this.getBounds(coords);
//        var distances = [0];
//           var i;
//           for (i = 1; i < this.state.placesForItinerary.length; i++) {
//              let data = {
//                 requestType: "distance",
//                 requestVersion: 4,
//                 place1: this.state.placesForItinerary[i - 1],
//                 place2: this.state.placesForItinerary[i],
//                 earthRadius: 3959.0
//                 }
//                 sendServerRequest(data).then(trip => {
//                    if (!trip) {
//                        distances.push(-1);
//                 }
//                    distances.push(trip.data.distance);
//                 });
//                    this.setState({distances: distances});
    }

}