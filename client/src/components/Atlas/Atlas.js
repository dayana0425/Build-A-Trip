import React, {Component} from 'react';
import {
    Col,
    Container,
    Row,
    Button,
    Form,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Alert,
    InputGroup,
    Input,
    InputGroupAddon,
    Table,
    Collapse,
    CardBody,
    Card
} from 'reactstrap';
import { List, ListItem, ListItemText } from '@material-ui/core';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import currentLocationIcon from '../../static/images/home-marker-icon.png';
import classnames from 'classnames';
import 'leaflet/dist/leaflet.css';
import {sendServerRequest} from "../../utils/restfulAPI";
import {Polyline} from 'react-leaflet';

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

    buttonStyleTable = {
        marginBottom: 10
    }

    buttonStyleClear = {
        marginTop: 10,
        marginLeft: 10
    }

    buttonStyleAddCoordinates = {
        marginBottom : 10
    }

    constructor(props) {
        super(props);
        this.setMarker = this.setMarker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addMarkersToMap = this.addMarkersToMap.bind(this);
        this.clearAllMarkers = this.clearAllMarkers.bind(this);
        this.handleChangeLatitude = this.handleChangeLatitude.bind(this);
        this.handleChangeLongitude = this.handleChangeLongitude.bind(this);
        this.handleCoordinateSubmit = this.handleCoordinateSubmit.bind(this);
        this.state = {
            markerPosition: null, //client testing will fail if you take this out
            markerPositions: [], //holds all markerPositions via input, map click, searched places, and current location botton
            activeTab: '1',
            searching: '',
            places: [],
            found: 0,
            results: 0,
            tripName: '',
            isOpen: false,
            options: null,
            placesForItinerary: [],
            distances: [],
            roundTrip: 0,
            lat1: 0,
            lng1: 0,
            //lat2: 0,
            //lng2: 0,
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            {this.renderTabs()}
                            {this.renderLeafletMap()}
                            {this.renderMapButtons()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    /* MAP BUTTONS */

    renderMapButtons() {
        return (
            <div>
                <Button color="primary" style={this.buttonStyleCurrLocation}
                        onClick={() => this.clearAllMarkers()}>
                        Reset {/*Clear Markers and Return to Current Location*/}
                </Button>
                <Button color="primary" style={this.buttonStyleClear}>

                        Show Distance
                </Button>
                <Button color="primary" onClick={()=>this.toggleIsOpen()} style={this.buttonStyleClear}>Show Itinerary</Button>
                <Collapse isOpen={this.state.isOpen}>
                    <Card style={{marginTop: 10}}>
                        <CardBody style={{marginTop: 10}}>
                            {this.renderBuildATrip()}
                            <h2> Itinerary {this.state.tripName} </h2>
                            <List>
                            {this.renderTripTable(this.state.placesForItinerary)}
                            </List>
                            <h2>{"Round Trip Distance (mi): " +
                            this.state.distances.reduce(function(a,b){
                                                        return a+b;
                                                    },0)}
                            </h2>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }

    /* END OF MAP BUTTONS */

    /* START OF TAB COMPONENT */

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
                            className={classnames({active: this.state.activeTab === '1'})}
                            onClick={() => {
                                this.toggle('1');
                            }}>
                            Add Location
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {
                                this.toggle('2');
                            }}>
                            Search Places
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        {this.state.activeTab == 1}
                        {this.renderAddLocationByCoordinates()}
                    </TabPane>
                    <TabPane tabId="2">
                        {this.state.activeTab == 2}
                        {this.renderFindPlaces()}
                    </TabPane>
                </TabContent>
            </div>
        )
    }

    /* END OF TAB COMPONENT */

    /* START OF TRIP COMPONENT */

    toggleIsOpen(){
        this.setState({isOpen: !this.state.isOpen});
    }

    renderBuildATrip() {
        return (
            <div>
                <InputGroup>
                    <Input type="text"
                           name="options"
                           value={this.name}
                           placeholder="Enter Trip Name"
                           onChange={(e) => {this.handleChangeTrip(e)}}/>
                    <InputGroupAddon addonType="append">
                        <Button color="primary" style={this.buttonStyleTable} onClick={(e) => {this.handleTripClick(e)}}>Enter</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }

    renderTripTable(places) {

        //console.log("Distances", distances);
        return (
            places.map((place,index) =>
                <ListItem key={index}>
                                <ListItemText primary={"Place " + (index+1) + ": " + place.name} />
                                <ListItemText primary={"Distance " + this.state.distances[index]}/>
                            </ListItem>
                 )
        )
    }

    handleChangeTrip = (event) => {
        this.setState({
            [event.target.name]: { title: event.target.value, earthRadius: "3959.0" }
        });
    }

    handleTripClick = (event) => {
        this.requestTrip();
    }

    requestTrip() {
        console.log("HELLO THERE", this.state.roundTrip);
        const {distances} = this.state;
        sendServerRequest({requestType: "trip", requestVersion: 3, options: this.state.options, places: this.state.placesForItinerary})
            .then(trip => {
                console.log("HELLO THERE", this.state.roundTrip);
                if (trip) {
                    this.setState({distances: trip.data.distances});
                    this.setState({tripName: trip.data.options.title});
                    if(trip.data.distances){
                        this.setState({roundTrip: trip.data.distances.reduce((a, b) => a + b, 0)})
                    }
                    console.log("HELLO THERE", this.state.roundTrip);
                } else {
                    console.error('Error');
                }
            });
    }

    /* END OF BUILD A TRIP COMPONENT */

    /*  START OF FIND PLACES COMPONENTS */

    renderFindPlaces() {
        return (
            <div>
                <InputGroup>
                    <Input type="text"
                           name="searching"
                           value={this.match}
                           placeholder="Enter Place"
                           onChange={(e) => {
                               this.handleChange(e)
                           }}/>
                    <InputGroupAddon addonType="append">
                        <Button color="primary" style={this.buttonStyleTable} onClick={(e) => {
                            this.handleClick(e)
                        }}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
                <Table bordered hover striped>
                    {this.renderTableHeader()}
                    <tbody>
                    {this.renderTable(this.state.places)}
                    </tbody>
                </Table>
                {this.renderResultsFound(this.state.found, this.state.results)}
            </div>
        );
    }

    renderTableHeader() {
        return (
            <thead>
            <tr>
                <th>Airport Name</th>
                <th> </th>
            </tr>
            </thead>
        )
    }

    renderTable(places) {
        return places.map((place) => {
            const {id, name, longitude, latitude} = place
            return (
                <tr key={id}>
                    <td>
                        {name}
                    </td>
                    <td>
                        <Button variant="primary" onClick={() => {
                            this.addMarkersToMap(name, latitude, longitude)}}>Add</Button>
                    </td>
                </tr>
            )
        })
    }

    renderResultsFound(found, results) {
        return (
            <Alert color="success">
                {found} results found. Currently displaying {results} of the most relevant results.
            </Alert>
        );
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick() {
        let match = this.convertInputString(this.state.searching)
        this.requestMatch(match)
    }

    convertInputString(searching){
        let match = '';
        searching.split("").map( letter=>{
            if ((/[a-zA-Z0-9_]/).test(letter))
                match +=letter
            else
                match += '_'
        })
        return match;
    }

    requestMatch(inputValue) {
        const {places} = this.state;
        sendServerRequest({requestType: "find", requestVersion: 3, match: inputValue, limit: 5, places: []})
            .then(find => {
                if (find) {
                    this.setState({places: find.data.places, found: find.data.found, results: find.data.places.length});
                    {
                        this.renderTable(places)
                    }
                } else {
                    console.error('Error');
                }
            });
    }

    /* END OF FIND PLACES COMPONENT */
    /* START OF ADD LOCATION BY COORDINATES COMPONENT */

    renderAddLocationByCoordinates(){
        return (
            <Col sm="30">
                <Form>
                    <Input type="text" name="lat1" value={this.lat1} placeholder="Enter Latitude" onChange={(e) => { this.handleChangeLatitude(e)}} />
                    <Input type="text" name="lng1" value={this.lng1} placeholder="Enter Longitude" onChange={(e) => { this.handleChangeLongitude(e)}} />
                </Form>
                <Button color="primary" style = {this.buttonStyleAddCoordinates}
                        onClick={() => this.handleCoordinateSubmit()}>
                    Add Location
                </Button>{' '}
            </Col>
        );
    }

    handleCoordinateSubmit() {
        this.addMarkersToMap("User's Typed Coordinates",this.state.lat1, this.state.lng1);
    }

    handleChangeLatitude = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeLongitude = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    requestGreatCircleDistance(latitude1, longitude1, latitude2, longitude2){
        let radian;
        let distance;
        let diff_longitude = Math.abs(longitude1 - longitude2);
        radian = Math.acos(
            Math.sin(latitude1)*Math.sin(latitude2) + Math.cos(latitude1)*Math.cos(latitude2)*Math.cos(diff_longitude)
        );
        distance = radian * EARTH_RADIUS;
        return (distance);
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
        } else {
            console.error("Not Available");
        }
    }

    addMarkersToMap(placeName, lat, long) {
        let coords = L.latLng(lat, long);
        this.setState({markerPositions: [...this.state.markerPositions, coords]});
        this.setState({placesForItinerary: [...this.state.placesForItinerary, {
            name: placeName,
            latitude: coords.lat + '',
            longitude: coords.lng + ''
        }]});

        var distances = [0];
                var i;
                       for (i = 1; i < this.state.placesForItinerary.length; i++){
                            console.log("Iterating? ", i)
                             //console.log("Look here", places)
                             //console.log(place, i, this.state.placesForItinerary[i+1])
                             let data = {
                                        requestType: "distance",
                                        requestVersion: 3,
                                        place1: this.state.placesForItinerary[i-1],
                                        place2: this.state.placesForItinerary[i],
                                        earthRadius: 3959.0
                             }
                             sendServerRequest(data).then(trip => {
                                if (!trip) {
                                    distances.push(-1);
                                }
                                distances.push(trip.data.distance);
                                console.log("Got distance")
                             });
                        }

                        this.setState({distances: distances})

        this.renderLeafletMap();

    }

    clearAllMarkers() {
        this.setState({markerPositions: []});
        this.setState({placesForItinerary: []});
    }

    renderLeafletMap() {
        let map_center;
        let fit_bounds;
        let zoom = 15;
        if (this.state.markerPositions.length != 0) {
            let sortedMarkerPositions = [...this.state.markerPositions].sort((a, b) => (a.lng > b.lng) ? 1 : -1);
            if (sortedMarkerPositions.length == 1) {
                map_center = [sortedMarkerPositions[0].lat, sortedMarkerPositions[0].lng];
                zoom = 17;
            } else {
                fit_bounds = L.latLngBounds(sortedMarkerPositions[0], sortedMarkerPositions[sortedMarkerPositions.length - 1]);
            }
        } else {
            map_center = MAP_CENTER_DEFAULT;
            this.requestCurrentLocation();
        }
      
        var points = [];

        this.state.markerPositions.forEach((position) => {
                points.push([position.lat, position.lng])
            }
        );

        return (
            <Map className={'mapStyle'} boxZoom={false} zoom={zoom} minZoom={MAP_MIN_ZOOM}
                 maxZoom={MAP_MAX_ZOOM} maxBounds={MAP_BOUNDS} center={map_center}
                 bounds={fit_bounds} boundsOptions={{padding: [50, 50]}} onClick={this.setMarker}
                 useFlyTo={true} maxBoundsViscosity={1.0} >
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
                {this.getMarker()}
                {this.drawLines(points)}
            </Map>
        );
    }

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
                        <Popup offset={[0, -18]}
                               className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
                    </Marker>
                )
            );
        } else {
            return (
                this.state.markerPositions.map((position, idx) =>
                    <Marker ref={initMarker} key={`marker-${idx}`} position={position} icon={CURR_LOC_MARKER_ICON}>
                        <Popup offset={[0, -18]}
                               className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
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
        return
    }

}