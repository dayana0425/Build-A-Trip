import React,{Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import currentLocationIcon from '../../static/images/home-marker-icon.png';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const CURR_LOC_MARKER_ICON = L.icon({iconUrl: currentLocationIcon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const EARTH_RADIUS = 3959;

export default class OurMap extends Component{

    constructor(props){
        super(props)
        this.state = {
            map_center:MAP_CENTER_DEFAULT,
            fit_bounds:null,
            zoom: 15
        }
        this.getBounds =  this.getBounds.bind(this)
    }

    getBounds(){
         if (this.props.markerPositions.length != 0) {
             let sortedMarkerPositions = [...this.props.markerPositions].sort((a, b) => (a.lng > b.lng) ? 1 : -1);
                 if (sortedMarkerPositions.length == 1) {
                     this.setState({map_center:[sortedMarkerPositions[0].lat, sortedMarkerPositions[0].lng]});
                     this.setState({zoom:17});
                 }
                 else {
                     this.setState({fit_bounds:L.latLngBounds(sortedMarkerPositions[0], sortedMarkerPositions[sortedMarkerPositions.length - 1])});
                 }
         }
         else {
             this.setState({map_center: MAP_CENTER_DEFAULT});
             this.props.requestCurrentLocation();
         }
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
                             <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
                         </Marker>
                     )
                 );
             } else {
                 return (
                     this.state.markerPositions.map((position, idx) =>
                         <Marker ref={initMarker} key={`marker-${idx}`} position={position} icon={CURR_LOC_MARKER_ICON}>
                             <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
                         </Marker>
                     )
                 );
             }
         }

    render(){
       return (
                <Map className={'mapStyle'}
                     boxZoom={false}
                     zoom={this.state.zoom}
                     minZoom={MAP_MIN_ZOOM}
                     maxZoom={MAP_MAX_ZOOM}
                     maxBounds={MAP_BOUNDS}
                     center={this.state.map_center}
                     bounds={this.state.fit_bounds}
                     boundsOptions={{padding: [50, 50]}}
                     onClick={this.props.setMarker, this.getBounds}
                     useFlyTo={true}
                     maxBoundsViscosity={1.0}>
                    <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
                    {this.getMarker}
                </Map>
            )
        }
}