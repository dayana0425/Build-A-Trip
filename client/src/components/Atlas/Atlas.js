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

        this.state = {
            markerPosition: null,
            markerPositions: [],
            activeTab: '1',
            placesForItinerary: []
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
                                     addMarkersToMap = {this.addMarkersToMap}/>
                             <ClearButton
                                     clearAllMarkers= {this.clearAllMarkers}
                                     markerPositions = {this.state.markerPositions}
                                     requestCurrentLocation = {this.props.requestCurrentLocation}
                                     addMarkersToMap = {this.addMarkersToMap}/>
                             <ItineraryButton
                                     placesForItinerary = {this.state.placesForItinerary}
                                     clearAllMarkers = {this.clearAllMarkers}/>
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

    clearAllMarkers(){ // clears all markers and returns to home - TO DO: clear distances
        this.setState({markerPositions: this.state.markerPositions.splice(0,0)});
        this.setState({placesForItinerary: this.state.placesForItinerary.splice(0,0)});
    }

    addMarkersToMap(placeName, lat, long) {
        let coords = L.latLng(lat, long);
        this.setState({ markerPositions: [...this.state.markerPositions, coords]});
        this.setState({ placesForItinerary: [...this.state.placesForItinerary, {name: placeName, latitude: coords.lat + '', longitude: coords.lng + ''}]});
    }
}