import './jestConfig/enzyme.config.js';

import React,{Component} from 'react';
import {shallow,mount} from 'enzyme';

import Map from '../src/components/Atlas/Map';

function testDrawLines(){
    const markerPosition = [{lat: 10.1, lng:10.2},
                            {lat: 20.1, lng:20.2},
                            {lat: 30.1, lng:30.2}];
    const map= shallow(<Map markerPositions = {markerPosition}/>);
    map.instance().drawLines();
}

test("Testing drawLines Function", testDrawLines);


function testToggle(){
    const markerPosition = [{lat: 10.1, lng:10.2},
                            {lat: 20.1, lng:20.2},
                            {lat: 30.1, lng:30.2}];
    const map= shallow(<Map markerPositions = {markerPosition}/>);
    map.instance().toggle();
}
test("Testing toggle Function", testToggle);


function testSetMap(){
    const markerPosition = [{lat: 10.1, lng:10.2},
                            {lat: 20.1, lng:20.2},
                            {lat: 30.1, lng:30.2}];
    const map= shallow(<Map markerPositions = {markerPosition}/>);
    map.instance().setMap();
}
test("Testing setMap Function", testSetMap);


function testSetMapWithOnlyOnePosition(){
    const markerPosition = [{lat: 10.1, lng:10.2}];
    const map= shallow(<Map markerPositions = {markerPosition}/>);
    map.instance().setMap();
}
test("Testing setMap Function", testSetMapWithOnlyOnePosition);


function testSetMapWithNoPosition(){
    const markerPosition = [];
    const map= shallow(<Map markerPositions = {markerPosition}/>);
    map.instance().setMap();
}
test("Testing setMap Function", testSetMapWithNoPosition);


function testSetMarker(){
    const mapClickInfo = {latlng: {lat:10.1, lng:10.1}};
    const markerPosition = [{lat: 10.1, lng:10.2},
                            {lat: 20.1, lng:20.2},
                            {lat: 30.1, lng:30.2}];
    const map = shallow(<Map addMarkersToMap = {(info) =>{markerPositions:[info]}}
                             markerPositions = {markerPosition}
                        />)
    map.instance().setMarker(mapClickInfo);
}
test("Testing setMarker Function", testSetMarker);

