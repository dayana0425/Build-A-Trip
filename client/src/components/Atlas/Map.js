import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {MAP_BOUNDS, MAP_CENTER_DEFAULT, BLUE_MARKER, START_MARKER, END_MARKER, MAP_LAYER_ATTRIBUTION, MAP_LAYER_URL, MAP_MIN_ZOOM, MAP_MAX_ZOOM} from "../../utils/constants";

export default class OurMap extends Component{
    constructor(props){
        super(props);
        this.setMarker = this.setMarker.bind(this);
        this.drawLines = this.drawLines.bind(this);
        this.getMarker = this.getMarker.bind(this);
        this.setMap = this.setMap.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            showLine: true,
        };
    }

    getStringMarkerPosition(markerPos) {
        return (this.props.geocode) ? this.props.geocode : "" + " Coordinates: " + markerPos.lat.toFixed(2) + ', ' + markerPos.lng.toFixed(2);
    }

    getMarker() {
        const initMarker = ref => {
            if (ref) {
                ref.leafletElement.openPopup()
            }
        };

        return (
            this.props.markerPositions.map((position, idx) =>
                (idx === 0) ?
                    <Marker ref={initMarker} key={`marker-${idx}`} position={position} icon={START_MARKER}>
                        <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
                    </Marker> : (idx === this.props.markerPositions.length-1 && idx !== 0) ?
                    <Marker ref={initMarker} key={`marker-${idx}`} position={position} icon={END_MARKER}>
                        <Popup offset={[0, -18]} className="font-weight-bold">{this.getStringMarkerPosition(position)}</Popup>
                    </Marker> :
                    <Marker ref={initMarker} key={`marker-${idx}`} position={position} icon={BLUE_MARKER}>
                        <Popup offset={[0, -18]} className="font-weight-bold"> {this.getStringMarkerPosition(position)}</Popup>
                    </Marker>
            )
        );
    }

    setMarker(mapClickInfo) {
        this.props.addMarkersToMap("mapClickInfo", mapClickInfo.latlng);
    }

    drawLines(){
        if (this.state.showLine) {
            let points = [];
            this.props.markerPositions.forEach((position) => { points.push([position.lat, position.lng]) });
            if (points.length > 2) { points.push(points[0]); }
            if (points.length > 1) { return (<Polyline positions={points} color='red'/>); }
        }
    }

    toggle() {
        this.setState({showLine: !this.state.showLine});
    }

    setMap(){
        let map_center;
        let fit_bounds;
        if (this.props.markerPositions.length > 0) {
            if (this.props.markerPositions.length === 1) {
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
           {/*<ClearButton toggle = {this.toggle}/>*/}
           {this.getMarker()}
           {this.drawLines()}
         </Map>
       )
    }
}
