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
const EARTH_RADIUS = 3959;

export default class OurMap extends Component{

    constructor(props){
        super(props)
        this.setMarker = this.setMarker.bind(this)
        this.drawLines = this.drawLines.bind(this)
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
       if (this.props.markerPositions.length > 1) {
          return (
             this.props.markerPositions.map((position, idx) =>
                <Marker ref={initMarker} key={`marker-${idx}`} position={position} icon={MARKER_ICON}>
                   <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
                </Marker>
             )
          );
       }
       else {
          return (
             this.props.markerPositions.map((position, idx) =>
                <Marker ref={initMarker} key={`marker-${idx}`} position={position} icon={CURR_LOC_MARKER_ICON}>
                   <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
                </Marker>
             )
          );
       }
    }

    setMarker(mapClickInfo) {
       this.props.addMarkersToMap("mapClickInfo", mapClickInfo.latlng);
    }

    drawLines(){
       var points = [];
          this.props.markerPositions.forEach((position) => {
             points.push([position.lat, position.lng])
          }
       );
       if (points.length > 1 ){
          return (
              <Polyline positions={points} color='red'/>
          );
       }
          return null
       }



    render(){
       return (
         <Map className={'mapStyle'}
               boxZoom={false}
               zoom={this.props.zoom}
               minZoom={MAP_MIN_ZOOM}
               maxZoom={MAP_MAX_ZOOM}
               maxBounds={MAP_BOUNDS}
               center={this.props.map_center}
               bounds={this.props.fit_bounds}
               boundsOptions={{padding: [50, 50]}}
               onClick={ this.setMarker }
               useFlyTo={true}
               maxBoundsViscosity={1.0}>
               <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
               {this.getMarker()}
               {this.drawLines()}
               </Map>
            )
        }
}