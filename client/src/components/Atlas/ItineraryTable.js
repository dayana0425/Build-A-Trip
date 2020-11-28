import React, {Component} from 'react';
import {Button, Card, CardBody, Collapse, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {sendServerRequest} from "../../utils/restfulAPI";

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
    }

    changeTripName(event) {
        this.setState({[event.target.name]: {title: event.target.value}});
    }

    simpleRequest(event){
        var name = this.state.options.title
        console.log(name)
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
                console.log(trip)
                if (trip) {
                    this.setState({tripName: trip.data.options.title});
                    if (trip.data.distances) {
                        this.setState({distances: trip.data.distances});
                        this.setState({roundTrip: trip.data.distances.reduce((a, b) => a + b, 0)})
                        this.setState({showDistance: true})
                    }
                    if(trip.data.places){
                        this.props.addPlacesToItineraryByArray(trip.data.places);
                    }
                    var markersForLoadingOntoMap = []
                    trip.data.places.forEach((place) => {
                        let lat = parseFloat(place.latitude);
                        let long = parseFloat(place.longitude);
                        markersForLoadingOntoMap.push(L.latLng(lat, long));
                    });
                    if (markersForLoadingOntoMap.length > 0) {
                        this.props.addMarkersByArrayToMap(markersForLoadingOntoMap);
                    }

                } else {
                    console.error('Error');
                }
            });
    }

    getTripTable(places) {
        return (
            <List>
                {places.map((place, index) =>
                    <ListItem key={index}>
                        <ListItemText primary={"Place " + (index + 1) + ": " + place.name}/>
                        <ListItemText
                            primary={((index != 0 && this.state.showDistance) ? "Distance: " + this.state.distances[index - 1] : "")}/>
                    </ListItem>
                )}
            </List>
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
                                    this.requestTrip()
                                }}>Enter</Button>
                                 <Button color="primary" name = "options" onClick={(e) => {
                                    this.requestWithOptimize(e)
                                    this.requestTrip()
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

