import React, {Component} from 'react';
import {Button, Row, Col} from 'reactstrap';
import ItineraryTable from './ItineraryTable';

export default class ClearButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            placesForItinerary: []
        }
        this.toggleIsOpen = this.toggleIsOpen.bind(this)
    }

    toggleIsOpen() {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <Row>
                <Col>
                    <Button color="primary" style={{ marginTop: 10 }} onClick={this.toggleIsOpen}>
                        View Itinerary
                    </Button>
                    <ItineraryTable isOpen={this.state.isOpen}
                                    placesForItinerary={this.props.placesForItinerary}
                                    reverseTrip={this.props.reverseTrip}
                                    clearAllMarkers={this.props.clearAllMarkers}
                                    addMarkersToMap={this.props.addMarkersToMap}
                                    addMarkersByArrayToMap={this.props.addMarkersByArrayToMap}
                                    addPlacesToItineraryByArray={this.props.addPlacesToItineraryByArray}
                                    updateItineraryAndMapByArray={this.props.updateItineraryAndMapByArray}/>
                </Col>
            </Row>
        )
    }
}