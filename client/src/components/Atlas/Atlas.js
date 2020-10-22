import React, {Component} from 'react';
import {
    Col,
    Container,
    Row,
    Button,
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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import currentLocationIcon from '../../static/images/home-marker-icon.png';
import classnames from 'classnames';
import 'leaflet/dist/leaflet.css';
import FindDistance from "./FindDistance";
import {sendServerRequest} from "../../utils/restfulAPI";

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const CURR_LOC_MARKER_ICON = L.icon({iconUrl: currentLocationIcon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default class Atlas extends Component {

    buttonStyleCurrLocation = {
        marginTop: 10
    }

    buttonStyleTable = {
        marginBottom: 10
    }

    buttonStyleClear = {
        marginTop: 10,
        marginLeft: 10
    }

    tripTextField = {
        marginBottom: 20
    }

    constructor(props) {
        super(props);
        this.setMarker = this.setMarker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addMarkersToMap = this.addMarkersToMap.bind(this);
        this.clearAllMarkers = this.clearAllMarkers.bind(this);

        this.state = {
            markerPosition: null, //client testing will fail if you take this out
            markerPositions: [], //holds all markerPositions via input, map click, searched places, and current location botton
            activeTab: '1',
            searching: '',
            places: [],
            found: 0,
            results: 0,
            tripName: '',
            modal: false
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            <h1> Build A Trip: {this.state.tripName} </h1> {/* Might move this somewhere else later*/}
                            {this.renderTripName()}
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

    renderMapButtons(){
        return(
            <div>
            <Button color="primary" style={this.buttonStyleClear}
                    onClick={() => this.clearAllMarkers()}>
                Clear Markers and Return to Current Location
            </Button>
            <Button color="primary" style={this.buttonStyleClear}>
                Show Distance
            </Button>
            <Button color="primary" style={this.buttonStyleClear}
                    onClick={() => this.toggleModal()}>
                Show Itinerary
            </Button>
            <Modal isOpen={this.state.modal} toggle={() => this.toggleModal()}>
                <ModalHeader toggle={() => this.toggleModal()}>Modal Title</ModalHeader>
                <ModalBody>
                    Add something here
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toggleModal()}>
                        Do something
                    </Button>
                    <Button color="secondary" onClick={() => this.toggleModal()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            </div>
        );
    }

    /* END OF MAP BUTTONS */

    /* START OF HELP CREATE MODAL */

    toggleModal = () => this.setState({modal: !this.state.modal})

    /* END OF HELP CREATE MODAL */

    /* START OF TRIP COMPONENT */

    renderTripName(){
        return(
            <InputGroup>
                <Input type="text"
                       name="tripName"
                       value={this.name}
                       placeholder="Enter Trip Name"
                       style = {this.tripTextField}
                       onChange={(e) => {
                           this.handleChangeTrip(e)
                       }}/>
            </InputGroup>
        );
    }

    handleChangeTrip = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /* END OF TRIP COMPONENT */

    /* START OF TAB COMPONENT */

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({activeTab: tab});
        }
    }

    renderTabs(){
        return(
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>
                            Add Locations
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab=== '2' })}
                            onClick={() => { this.toggle('2'); }}>
                            Search Places
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        { this.state.activeTab == 1 }
                        <FindDistance/>
                    </TabPane>
                    <TabPane tabId="2">
                        { this.state.activeTab == 2 }
                        { this.renderFindPlaces() }
                    </TabPane>
                </TabContent>
            </div>
        )
    }

    /* END OF TAB COMPONENT */

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
                        <Button center variant="primary" onClick={() => {
                            this.addMarkersToMap(latitude, longitude)
                        }}>Add</Button>
                    </td>
                </tr>
            )
        })
    }

    renderResultsFound(found, results) { //results == limit
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

    handleClick = (event) => {
        var match = '';
        this.state.searching.split("").map( letter=>{
            if ((/[a-zA-Z0-9_]/).test(letter))
                match +=letter
            else
                match += '_'
            return match
        }
        )
        console.log(match)
        this.requestMatch(match)
    }

    requestMatch(inputValue) {
        const {places} = this.state;
        sendServerRequest({requestType: "find", requestVersion: 2, match: inputValue, limit: 5, places: []})
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

    requestCurrentLocation() {
        self = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    self.addMarkersToMap(position.coords.latitude, position.coords.longitude);},
                function (error) {
                    console.error("Error Code = " + error.code + " - " + error.message);});
        } else {
            console.error("Not Available");
        }
    }

    addMarkersToMap(lat, long) {
        this.setState({markerPositions: [...this.state.markerPositions, L.latLng(lat, long)]});
        this.renderLeafletMap();
    }

    clearAllMarkers(){
        this.setState({markerPositions: []});
    }

    renderLeafletMap() {
        let map_center;
        let fit_bounds;
        let zoom = 15;

        if (this.state.markerPositions.length != 0) {
            let sortedMarkerPositions = this.state.markerPositions.sort((a, b) => (a.lng > b.lng) ? 1 : -1);

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

        return (
            <Map
                className={'mapStyle'}
                boxZoom={false}
                zoom={zoom}
                minZoom={MAP_MIN_ZOOM}
                maxZoom={MAP_MAX_ZOOM}
                maxBounds={MAP_BOUNDS}
                center={map_center}
                bounds={fit_bounds}
                boundsOptions={{padding: [50, 50]}}
                onClick={this.setMarker}
                useFlyTo={true}
                maxBoundsViscosity={1.0}
            >
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
                {this.getMarker()}
            </Map>
        );
    }

    setMarker(mapClickInfo) {
        this.addMarkersToMap(mapClickInfo.latlng);
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
        }
        else {
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

}