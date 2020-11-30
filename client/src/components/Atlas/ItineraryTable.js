import React, {Component} from 'react';
import {Map, Button, Card, CardBody, Collapse, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {sendServerRequest} from "../../utils/restfulAPI";
import PlacesTable from "./DragAndDropListView.js";
import 'leaflet/dist/leaflet.css';

export default class ItineraryTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tripName: "",
            roundTrip: 0,
            options: null,
            isOpen: '',
            places: null,
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
    }

    changeTripName(event) {
        this.setState({[event.target.name]: {title: event.target.value}});
    }

    simpleRequest(event){
        var name = this.state.options.title
        var options = {
            title: name,
            earthRadius:"3959.0"
        }
        this.requestTrip(options)
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
        console.log(distanceSet)
        this.setState({distances: distanceSet});
        this.setState({roundTrip: distanceSet.reduce((a, b) => a + b, 0)})
        this.setState({showDistance: true})
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
          }
        )
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
                                console.log(markersForLoadingOntoMap)

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
    }

    render() {
        return (
            <Collapse isOpen={this.props.isOpen}>
                <Card style={{marginTop: 10}}>
                    <CardBody style={{marginTop: 10}}>
                        <InputGroup>
                            <Input type="text" name="options" value={this.name} placeholder="Enter Trip Name"
                                   onChange={(e) => {
                                       this.changeTripName(e)
                                   }}/>
                            <InputGroupAddon addonType="append">
                                <Button color="primary" onClick={(e) => {
                                    this.simpleRequest(e)
                                }}>Enter</Button>
                                 <Button color="primary" name = "options" onClick={(e) => {
                                    this.requestWithOptimize(e)
                                 }}>Optimize</Button>
                            </InputGroupAddon> &nbsp;
                            <Button color="primary" onClick={() => {
                                this.saveFile(JSON.stringify(this.saveFileFormat()), this.state.tripName, 'application/json')
                            }}>Save Trip</Button>
                            <Input type="file" onChange={(e) => {
                                this.onUploadChange(e)
                            }}>Upload</Input>
                        </InputGroup>
                        <h2> Itinerary {this.state.tripName} </h2>
                        {this.getTripTable(this.props.placesForItinerary)}
                        <h3>{"Round Trip Distance (mi): " + this.state.distances.reduce(function (a, b) {
                            return a + b;
                        }, 0)}</h3>
                        <Button color="primary" style={{marginTop: 10}} onClick={this.clearDistance}>
                            Reset Trip
                        </Button>
                    </CardBody>
                </Card>
            </Collapse>
        )
    }
}

