import React, {Component} from 'react';
import { Col, Container, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import AddLocation from './AddLocation';
import ClearButton from './ClearButton';
import ItineraryButton from './ItineraryButton';
import SearchPlaces from './SearchPlaces'
import OurMap from './Map'

export default class Atlas extends Component {

    constructor(props) {
        super(props);
        this.addMarkersToMap = this.addMarkersToMap.bind(this);
        this.clearAllMarkers = this.clearAllMarkers.bind(this);
        this.addMarkersByArrayToMap = this.addMarkersByArrayToMap.bind(this);
        this.addPlacesToItineraryByArray = this.addPlacesToItineraryByArray.bind(this);
        this.updateItineraryAndMapByArray = this.updateItineraryAndMapByArray.bind(this);
        this.reverseTrip = this.reverseTrip.bind(this);
        this.getReverseGeocode = this.getReverseGeocode.bind(this);

        this.state = {
            markerPosition: null,
            markerPositions: [],
            reverseGeocodedMarkerPositions: [],
            activeTab: '1',
            placesForItinerary: [],
            geocode: ""
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            {this.renderTabs()}
                             <OurMap
                                     markerPositions = {this.state.markerPositions}
                                     requestCurrentLocation = {this.props.requestCurrentLocation}
                                     addMarkersToMap = {this.addMarkersToMap}
                                     addMarkersByArrayToMap = {this.addMarkersByArrayToMap}
                                     addPlacesToItineraryByArray = {this.addPlacesToItineraryByArray}
                                     reverseGeocodedMarkerPositions = {this.state.reverseGeocodedMarkerPositions}/>
                             <ClearButton
                                     clearAllMarkers= {this.clearAllMarkers}
                                     markerPositions = {this.state.markerPositions}
                                     requestCurrentLocation = {this.props.requestCurrentLocation}
                                     addMarkersToMap = {this.addMarkersToMap}/>
                             <ItineraryButton
                                     placesForItinerary = {this.state.placesForItinerary}
                                     reverseTrip = {this.reverseTrip}
                                     addMarkersToMap = {this.addMarkersToMap}
                                     clearAllMarkers = {this.clearAllMarkers}
                                     addMarkersByArrayToMap = {this.addMarkersByArrayToMap}
                                     addPlacesToItineraryByArray = {this.addPlacesToItineraryByArray}
                                     updateItineraryAndMapByArray = {this.updateItineraryAndMapByArray}
                                     reverseGeocodedMarkerPositions = {this.state.reverseGeocodedMarkerPositions}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }


    /* TABS */
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
                        <AddLocation addMarkersToMap = {this.addMarkersToMap}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <SearchPlaces addMarkersToMap = {this.addMarkersToMap}/>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
    /* END OF TABS */

    /* METHODS FOR MAP MARKERS */

    //clears all markers on map
    clearAllMarkers(){ // clears all markers and returns to home - TO DO: clear distances
        this.setState({markerPositions: this.state.markerPositions.splice(0,0)});
        this.setState({placesForItinerary: this.state.placesForItinerary.splice(0,0)});
        this.setState({reverseGeocodedMarkerPositions: this.state.reverseGeocodedMarkerPositions.splice(0,0)});
    }

    //adds markers to map one by one must provide name of marker + lat + long, it also adds places to Itinerary
    addMarkersToMap(placeName, lat, long) {
        let coords = L.latLng(lat, long);
        this.setState({ markerPositions: [...this.state.markerPositions, coords]});
        this.getReverseGeocode(coords, this.state.markerPositions.length-1);
        this.setState({ placesForItinerary: [...this.state.placesForItinerary, {name: placeName, latitude: coords.lat + '', longitude: coords.lng + ''}]});
    }

    //adds markers to map given an array of L.LatLng() objects
    addMarkersByArrayToMap(positions) {
        this.setState({ markerPositions: positions});
    }

    //adds places to itinerary given an array of "place" objects: {name: (string) , latitude: (string) , longitude: (string)}
    addPlacesToItineraryByArray(places){
        this.setState({placesForItinerary: places});
    }

    //updates both placesForItinerary and markerPositions by array at once - method for itinerary
    updateItineraryAndMapByArray(places){
        let newMarkerPositions = [];
        this.setState({placesForItinerary: places});
        places.map((place) => newMarkerPositions.push(L.latLng(parseFloat(place.latitude), parseFloat(place.longitude))));
        this.setState({markerPositions: newMarkerPositions});
    }

    //reverses trip on map view and on the itinerary
    reverseTrip() {
        let tripList = this.state.placesForItinerary;
        let markerPosList = this.state.markerPositions;
        this.setState({placesForItinerary: tripList.reverse()});
        this.setState({markerPositions: markerPosList.reverse()})
    }

    getReverseGeocode(position) {
        fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=${position.lng},${position.lat}`)
            .then(res => res.json())
            .then(myJson => {
                try {
                    this.setState({reverseGeocodedMarkerPositions: [...this.state.reverseGeocodedMarkerPositions, myJson.address.LongLabel]});
                }
                catch(e){
                    this.setState({reverseGeocodedMarkerPositions: [...this.state.reverseGeocodedMarkerPositions, 'undefined']});
                }
            });
    }

    /* END OF MAP MARKERS */
}