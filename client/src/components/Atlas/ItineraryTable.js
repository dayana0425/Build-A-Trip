import React, {Component} from 'react';
import {Button, Card, CardBody, Collapse, Input, InputGroup, InputGroupAddon, Alert, Row, Col, Label, FormText} from 'reactstrap';
import {sendServerRequest} from "../../utils/restfulAPI";
import PlacesTable from "./DragAndDropListView";
import 'leaflet/dist/leaflet.css';
export default class ItineraryTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tripName: "",
            roundTrip: 0,
            options: {},
            isOpen: '',
            places: [],
            distances: [],
            showDistance: false
        }
        this.changeTripName = this.changeTripName.bind(this);
        this.simpleRequest = this.simpleRequest.bind(this);
        this.requestWithOptimize = this.requestWithOptimize.bind(this);
        this.requestTrip = this.requestTrip.bind(this);
        this.clearDistance = this.clearDistance.bind(this);
        this.uploadTrip = this.uploadTrip.bind(this);
        this.getTripDistance = this.getTripDistance.bind(this);
        this.getTripTable = this.getTripTable.bind(this);
        this.showButtonOptions = this.showButtonOptions.bind(this);
    }

    changeTripName(event) {
        this.setState({[event.target.name]: {title: event.target.value}});
        this.setState({tripName: this.state.options.title});
    }

    simpleRequest(event){
        if(this.state.options.title){
            var name = this.state.options.title
            var options = {
                title: name,
                earthRadius: "3959.0"
            }
            this.requestTrip(options)
        }
    }

    requestWithOptimize(event){
        var name = this.state.options.title
        var options = {
              title:name,
              earthRadius: "3959.0",
              response: "1.0"
        }
        this.requestTrip(options)
    }

    getTripDistance(distanceSet){
        this.setState({distances: distanceSet});
        this.setState({roundTrip: distanceSet.reduce((a, b) => a + b, 0)})
        if(distanceSet.length !== 0) {
            this.setState({showDistance: true});
        }
    }

    getMarkersForLoadingOntoMap(places){
        var markersArray = [];
        places.forEach((place) => {
            let lat = parseFloat(place.latitude);
            let long = parseFloat(place.longitude);
            markersArray.push(L.latLng(lat, long));
        });
        return markersArray;
    }

    requestTrip(options) {
        sendServerRequest(
          {
            requestType: "trip",
            requestVersion: 4,
            options: options,
            places: this.props.placesForItinerary
          })
        .then(trip => {
            if (trip) {
                this.setState({tripName: trip.data.options.title});
                if (trip.data.distances) {
                      const distanceSet = trip.data.distances
                      this.getTripDistance(distanceSet);
                }

                if(trip.data.places){
                    this.props.addPlacesToItineraryByArray(trip.data.places);
                    var markersForLoadingOntoMap = this.getMarkersForLoadingOntoMap(trip.data.places);
                    this.props.addMarkersByArrayToMap(markersForLoadingOntoMap);
                }
            }
            else {
                    console.error('requestTrip: Error');
            }
        });
    }

    getTripTable(places) {
        return (
            <PlacesTable places={places}
                         addPlacesToItineraryByArray={this.props.addPlacesToItineraryByArray}
                         showDistance={this.state.showDistance}
                         distances={this.state.distances}
            />
        )
    }

    saveFile(fileText, fileName, fileType) {
        let file = new Blob([fileText], {type: fileType});
        let element = document.createElement('a'),
            url = URL.createObjectURL(file);
        element.href = url;
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
        setTimeout(function () {
            document.body.removeChild(element);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    saveFileFormat() {
        return {
            requestType: "trip",
            requestVersion: 4,
            title: this.state.tripName,
            earthRadius: 3959.0,
            places: this.props.placesForItinerary
        };
    }

    onUploadChange(event) {
        const testing = new FileReader();
        const scope = this;
        let file = event.target;
        const reader = new FileReader();
        reader.onload = async (event) => {
            const data = (reader.result);
            scope.uploadTrip(data);
        };
        reader.readAsText(file.files[0]);
    }

    uploadTrip(data) {
        const text = JSON.parse(data);
        var loadFilePositions = []
        var markersForLoadingOntoMap = []
        var placesForLoadingOntoItinerary = []
        loadFilePositions.push(text);
        if (loadFilePositions) {
            var positions = loadFilePositions[0].places;
            positions.forEach((place) => {
                let lat = parseFloat(place.latitude);
                let long = parseFloat(place.longitude);
                markersForLoadingOntoMap.push(L.latLng(lat, long));
                placesForLoadingOntoItinerary.push({name: place.name, latitude: lat + '', longitude: long + ''});
            });
            if (markersForLoadingOntoMap.length > 0) {
                this.props.addMarkersByArrayToMap(markersForLoadingOntoMap);
            }

            if(placesForLoadingOntoItinerary.length > 0) {
                this.props.addPlacesToItineraryByArray(placesForLoadingOntoItinerary);
            }

            this.getTripTable(loadFilePositions);
        }
    }

    clearDistance() {
        {this.props.clearAllMarkers()}
        this.setState({distances: []});
        this.setState({showDistance: false});
        this.setState({roundTrip: 0});
        this.setState({tripName: ""});
    }

    showRoundTrip(){
        return(
            <Alert>
                <h3>{"Round Trip (mi): " + this.state.distances.reduce(function (a, b) {return a + b;}, 0)}</h3>
            </Alert>
        );
    }

    showNameAndLoadFile(){
        return(
            <Col>
                <Row>
                    <h2>{this.state.tripName + " Itinerary"}</h2>
                </Row>
                <Row>
                    <Input type="file" onChange={(e)=> {this.onUploadChange(e)}}/>
                    <FormText color="muted">*Supports JSON File Format Only</FormText>
                </Row>
            </Col>
        );
    }

    showButtonOptions(){
        return(
            <Col>
                <Row>
                    <Button style={buttonStyles} color="primary" onClick={this.clearDistance}>
                        <Delete> </Delete>
                    </Button>
                    <Button style={buttonStyles} color="primary" onClick={() => {this.saveFile(JSON.stringify(this.saveFileFormat()), this.state.tripName, 'application/json')}}>
                        <Save> </Save>
                    </Button>
                    <Button color="primary" style={buttonStyles} name = "options" onClick={(e) => {this.requestWithOptimize(e)}}>
                        <Optimize> </Optimize>
                    </Button>
                    <Button color="primary" style={buttonStyles} name = "options" onClick={(e) => {this.simpleRequest(e)}}>
                        <Distance> </Distance>
                    </Button>
                </Row>
            </Col>
        );
    }

    showTripNameInputField(){
        return(
            <InputGroup style={{marginBottom: 10}}>
                <Input type="text" name="options" value={this.name} onChange={(e) => {this.changeTripName(e)}} placeholder="Enter Trip Name"/>
                <InputGroupAddon addonType="append">
                    <Button size="med" color="primary" onClick={(e) => {this.changeTripName(e)}}>Enter</Button>
                </InputGroupAddon>
            </InputGroup>
        );
    }

    render() {
        return (
            <Collapse isOpen={this.props.isOpen}>
                <Card style={{marginTop: 10}}>
                    <CardBody style={{marginTop: 10}}>
                        {this.showTripNameInputField()}
                        {(this.state.tripName) ? this.showNameAndLoadFile() : "" }
                        {(typeof this.props.placesForItinerary !== 'undefined' && this.props.placesForItinerary.length !== 0 && this.state.tripName) ? this.getTripTable(this.props.placesForItinerary) : ""}
                        {(typeof this.state.distances !== 'undefined' && this.state.distances.length !== 0 && this.state.tripName) ? this.showRoundTrip() : ""}
                        {(typeof this.props.placesForItinerary !== 'undefined' && this.props.placesForItinerary.length !== 0 && this.state.tripName) ? this.showButtonOptions() : ""}
                    </CardBody>
                </Card>
            </Collapse>
        )
    }
}

export const Save = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
);

export const Delete = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
);

export const Optimize = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
);

export const Distance = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M19.5 9.5c-1.03 0-1.9.62-2.29 1.5h-2.92c-.39-.88-1.26-1.5-2.29-1.5s-1.9.62-2.29 1.5H6.79c-.39-.88-1.26-1.5-2.29-1.5C3.12 9.5 2 10.62 2 12s1.12 2.5 2.5 2.5c1.03 0 1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5s1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"/></svg>
);

const buttonStyles = {
    border: 'none',
    margin: 0,
    padding: 0,
    width: 'auto',
    overflow: 'visible',
    cursor: 'pointer',
    background: 'transparent'
};