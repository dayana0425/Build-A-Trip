import './jestConfig/enzyme.config.js';
import React,{Component} from 'react';
import {shallow,mount} from 'enzyme';
import File from '../src/components/Atlas/File';
import {Row} from 'reactstrap';

import {Map} from 'react-leaflet';



function testSaveFileFormat(){
    const file = shallow(<File/>);
    file.instance().saveFileFormat();
}
test("Testing saveFileFormat Function", testSaveFileFormat);

function testRender(){
    const file = shallow(<File/>);
    expect(file.exists(Row)).toEqual(true);
}
test("Testing render()", testRender);

function testUploadTrip(){
    const file = shallow(<File
                            addMarkersByArrayToMap = {(data) => {markerPositions:data}}
                            addPlacesToItineraryByArray = {(places) => {placesForItinerary: places}}
                         />);
    const data = { "requestType":"trip",
                   "requestVersion":4,
                   "title":"my trip",
                   "earthRadius":3959,
                   "places":[{"name":"mapClickInfo1","latitude":"40.600092382671974","longitude":"-105.07830379347736"}]
                 }
    file.instance().uploadTrip(JSON.stringify(data));
}
test("Testing uploadTrip() method", testUploadTrip);