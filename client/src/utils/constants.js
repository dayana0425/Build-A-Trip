import ulog from "ulog";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import currentLocationIcon from '../static/images/home-marker-icon.png';

function setLogLevelIfDefault() {
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    if(!urlParams.has("log")) {
        ulog.level = ulog.ERROR
    }
}

setLogLevelIfDefault();

export const LOG = ulog("App");
export const CLIENT_TEAM_NAME = "T16 Team Hexadecimal";
export const EARTH_RADIUS_UNITS_DEFAULT = {"miles": 3959};
export const PROTOCOL_VERSION = 3;
export const HTTP_OK = 200;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_INTERNAL_SERVER_ERROR = 500;
export const MAP_BOUNDS = [[-90, -180], [90, 180]];
export const MAP_CENTER_DEFAULT = [40.5734, -105.0865];
export const MARKER_ICON = L.icon({iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
export const CURR_LOC_MARKER_ICON = L.icon({iconUrl: currentLocationIcon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
export const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
export const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const MAP_MIN_ZOOM = 2;
export const MAP_MAX_ZOOM = 19;
