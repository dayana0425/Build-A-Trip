import ulog from "ulog";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import currentLocationIcon from '../static/images/home-marker-icon.png';
import 'react-leaflet';
import start from '../static/images/google-start-green.png';
import end from '../static/images/google-end-red.png';
import normal from '../static/images/google-normal-blue.png';
import React from "react";

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
//IMPORTANT!!! Marker icon sizes must be 25 x 40
export const MARKER_ICON = L.icon({iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
export const CURR_LOC_MARKER_ICON = L.icon({iconUrl: currentLocationIcon, shadowUrl: iconShadow, iconAnchor: [12, 40]});
export const START_MARKER = L.icon({iconUrl: start, shadowUrl: iconShadow, iconAnchor: [12,40]});
export const END_MARKER = L.icon({iconUrl: end, shadowUrl: iconShadow, iconAnchor: [12,40]});
export const BLUE_MARKER = L.icon({iconUrl: normal, shadowUrl: iconShadow, iconAnchor: [12,40]});
export const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
export const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const MAP_MIN_ZOOM = 2;
export const MAP_MAX_ZOOM = 19;
//Button ICONS
export const RemovableIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
);
export const HandleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/></svg>
);

export const buttonStyles = {
    border: 'none',
    margin: 0,
    padding: 0,
    width: 'auto',
    overflow: 'visible',
    cursor: 'pointer',
    background: 'transparent'
};
export const Add = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
);

export const Save = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
);

export const Delete = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
);

export const Optimize = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
);

export const Distance = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M19.5 9.5c-1.03 0-1.9.62-2.29 1.5h-2.92c-.39-.88-1.26-1.5-2.29-1.5s-1.9.62-2.29 1.5H6.79c-.39-.88-1.26-1.5-2.29-1.5C3.12 9.5 2 10.62 2 12s1.12 2.5 2.5 2.5c1.03 0 1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5s1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"/></svg>
);

export const Reverse = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/></svg>
);

export const Information = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
);
