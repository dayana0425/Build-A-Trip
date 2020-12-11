import React, {Component} from 'react';
import {Button, Card, CardBody, Collapse, Input, InputGroup, InputGroupAddon, Alert, Row, Col, ModalBody, Modal} from 'reactstrap';
import {sendServerRequest} from "../../utils/restfulAPI";
import Tooltip from '@material-ui/core/Tooltip';
import PlacesTable from "./DragAndDropListView";
import 'leaflet/dist/leaflet.css';
import {Save, Delete, Optimize, Distance, Reverse, buttonStyles} from "../../utils/constants";
import File from './File'

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
            showDistance: false,
            fileFormatOpen: false,
            categories:[
                {id:1, value:"JSON"},
                {id:2, value:"CSV"}
            ],
            JSON: false,
            CSV: false,
            modal: false,
            fade: false
        }
        this.changeTripName = this.changeTripName.bind(this);
        this.simpleRequest = this.simpleRequest.bind(this);
        this.requestWithOptimize = this.requestWithOptimize.bind(this);
        this.requestTrip = this.requestTrip.bind(this);
        this.clearDistance = this.clearDistance.bind(this);
        this.getTripDistance = this.getTripDistance.bind(this);
        this.getTripTable = this.getTripTable.bind(this);
        this.showButtonOptions = this.showButtonOptions.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.JSONDownload = this.JSONDownload.bind(this)
        this.CSVDownload = this.CSVDownload.bind(this)
        this.saveFileFormat = this.saveFileFormat.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.saveCSVFile = this.saveCSVFile.bind(this);
    }

    JSONDownload(){
        this.setState({JSON: !this.state.JSON});
    }

    CSVDownload(){
        this.setState({CSV: !this.state.CSV});
    }

    handleChange(event) {
        var item = event.target.value;
        if(item == 1){
            this.JSONDownload()
        }
        if(item == 2){
            this.CSVDownload()
        }
    }

    handleSubmit(event) {
        if(this.state.JSON){
            this.saveFile(JSON.stringify(this.saveFileFormat()), this.state.tripName, 'application/json')
        }
        if(this.state.CSV){
            this.saveCSVFile(this.saveFileFormat())
        }
    }

    saveCSVFile(data){
        const { Parser, transforms: { unwind }  } = require('json2csv');
        const place = data.places;
        const fields = ['name', 'latitude','longitude'];
        const transforms = [unwind({ paths: ['name'] })];
        const json2csvParser = new Parser({ fields, transforms });
        const csv = json2csvParser.parse(place);
        this.saveFile(csv, "trip", 'text/csv')
    }

    saveFileFormat() {
        return {
            requestType: "trip",
            requestVersion: 4,
            options: this.state.options,
            places: this.props.placesForItinerary
        };
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

    changeTripName(event) {
        this.setState({[event.target.name]: {title: event.target.value}});
    }

    onClickTripName(){
        this.setState({tripName: this.state.options.title});
    }

    simpleRequest(event){
        if(this.state.options.title){
            var name = this.state.options.title
            var option = {
                title: name,
                earthRadius: "3959.0"
            }
            this.requestTrip(option)
            this.setState({options: option})
        }
    }

    requestWithOptimize(event){
        var name = this.state.options.title
        var option = {
              title:name,
              earthRadius: "3959.0",
              response: "1.0"
        }
        this.requestTrip(option)
        this.setState({options: option})
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
                         reverseGeocodedMarkerPositions = {this.props.reverseGeocodedMarkerPositions}
                         updateItineraryAndMapByArray={this.props.updateItineraryAndMapByArray}
                         addPlacesToItineraryByArray={this.props.addPlacesToItineraryByArray}
                         showDistance={this.state.showDistance}
                         distances={this.state.distances}/>
        )
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

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        this.setState({CSV:false});
        this.setState({JSON:false});
    }

    showButtonOptions(){
        return(
            <Col>
                <Row>
                    <Tooltip title="Delete Trip">
                            <Button style={buttonStyles} color="primary" onClick={this.clearDistance}>
                                <Delete> </Delete>
                            </Button>
                    </Tooltip>
                    <Tooltip title="Save Trip">
                        <Button style={buttonStyles} color="primary" onClick={()=>{this.toggle()}}>
                                <Save> </Save>
                        </Button>
                    </Tooltip>
                        <Modal isOpen={this.state.modal} fade={this.state.fade} toggle={this.toggle}>
                            <ModalBody>
                                <form onSubmit={this.handleSubmit}>
                                    {(this.state.categories !== undefined) ? this.state.categories.map((item, id) => (
                                        <li key={id}>
                                            <label>
                                                <input type="checkbox" value={item.id} onChange={this.handleChange}/>
                                                {item.value}
                                            </label>
                                        </li>
                                    )) : ""}
                                    <Button color="primary" style={{marginTop: 10, marginBottom: 10}} onClick={this.handleSubmit}>
                                        Submit
                                    </Button>
                                    <Button color="primary" style={{marginTop: 10, marginBottom: 10, marginLeft: 10}} onClick={this.toggle}>
                                        Close
                                    </Button>
                                </form>
                            </ModalBody>
                        </Modal>
                    <Tooltip title="Optimize Trip">
                        <Button color="primary" style={buttonStyles} name = "options" onClick={(e) => {this.requestWithOptimize(e)}}>
                            <Optimize> </Optimize>
                        </Button>
                    </Tooltip>
                    <Tooltip title="Show Distances">
                         <Button color="primary" style={buttonStyles} name = "options" onClick={(e) => {this.simpleRequest(e)}}>
                            <Distance> </Distance>
                        </Button>
                    </Tooltip>
                    <Tooltip title="Reverse Trip">
                        <Button color="primary" style={buttonStyles} name = "options" onClick={(e) => {this.props.reverseTrip()}}>
                            <Reverse> </Reverse>
                        </Button>
                    </Tooltip>
                </Row>
            </Col>
        );
    }

    showTripNameInputField(){
        return(
            <InputGroup style={{marginBottom: 10}}>
                <Input type="text" name="options" value={this.name} onChange={(e) => {this.changeTripName(e)}} placeholder="Enter Trip Name"/>
                <InputGroupAddon addonType="append">
                    <Button size="med" color="primary" onClick={() => {this.onClickTripName()}}>Enter</Button>
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
                        {(this.state.tripName) ? <File ref = "file"
                                                       tripName = {this.state.tripName}
                                                       addMarkersByArrayToMap = {this.props.addMarkersByArrayToMap}
                                                       addPlacesToItineraryByArray = {this.props.addPlacesToItineraryByArray}
                                                       options = {this.state.options}
                                                       placesForItinerary = {this.props.placesForItinerary}/>: "" }
                        {(this.props.placesForItinerary !== undefined && this.state.tripName) ? this.getTripTable(this.props.placesForItinerary) : ""}
                        {(typeof this.state.distances !== 'undefined' && this.state.distances.length !== 0 && this.state.tripName) ? this.showRoundTrip() : ""}
                        {(typeof this.props.placesForItinerary !== 'undefined' && this.props.placesForItinerary.length !== 0 && this.state.tripName) ? this.showButtonOptions() : ""}
                    </CardBody>
                </Card>
            </Collapse>
        )
    }
}