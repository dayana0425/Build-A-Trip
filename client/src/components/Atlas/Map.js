import React,{Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import currentLocationIcon from '../../static/images/home-marker-icon.png';
import 'leaflet/dist/leaflet.css';
import {Polyline} from 'react-leaflet';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
const MARKER_ICON = L.icon({iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const CURR_LOC_MARKER_ICON = L.icon({iconUrl: currentLocationIcon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;

export default class OurMap extends Component{

    constructor(props){
        super(props)
        this.setMarker = this.setMarker.bind(this)
        this.drawLines = this.drawLines.bind(this)
        this.getMarker = this.getMarker.bind(this)
        this.setMap = this.setMap.bind(this)
    }

    getStringMarkerPosition(markerPos) {
       return markerPos.lat.toFixed(2) + ', ' + markerPos.lng.toFixed(2);
    }

    getMarker() {
        const initMarker = ref => {
            if (ref) {
                ref.leafletElement.openPopup()
            }
        };

        let Icon = CURR_LOC_MARKER_ICON;
        if (this.props.markerPositions.length > 1) {
            Icon = MARKER_ICON;
        }
        return (
            this.props.markerPositions.map((position, idx) =>
                <Marker ref={initMarker} key={`marker-${idx}`} position={position} icon={Icon}>
                    <Popup offset={[0, -18]}
                           className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
                </Marker>
            )
        );
    }

    setMarker(mapClickInfo) {
       this.props.addMarkersToMap("mapClickInfo", mapClickInfo.latlng);
    }

    drawLines(){
        let points = [];
        this.props.markerPositions.forEach((position) => { points.push([position.lat, position.lng]) });
        if (points.length > 1) { return (<Polyline positions={points} color='red'/>); }
    }

    setMap(){
        let map_center;
        let fit_bounds;
        if (this.props.markerPositions.length > 0) {
            if (this.props.markerPositions.length == 1) {
                map_center = [this.props.markerPositions[0].lat, this.props.markerPositions[0].lng];
            } else {
                let sortedMarkerPositions = [...this.props.markerPositions].sort((a, b) => (a.lng > b.lng) ? 1 : -1);
                fit_bounds = L.latLngBounds(sortedMarkerPositions[0], sortedMarkerPositions[sortedMarkerPositions.length - 1]);
            }
        } else {
            map_center = MAP_CENTER_DEFAULT;
        }
        return [map_center, fit_bounds];
    }

    render(){

        let value = this.setMap();
        let map_center = value[0];
        let fit_bounds = value[1];
        let zoom = 17;

       return (
         <Map
           className={'mapStyle'}
           boxZoom={false}
           minZoom={MAP_MIN_ZOOM}
           maxZoom={MAP_MAX_ZOOM}
           maxBounds={MAP_BOUNDS}
           zoom={zoom}
           center={map_center}
           bounds={fit_bounds}
           boundsOptions={{padding: [50, 50]}}
           onClick={this.setMarker}
           useFlyTo={true}
           maxBoundsViscosity={1.0}>
           <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
           {this.getMarker()}
           {this.drawLines()}
         </Map>
       )
    }
}