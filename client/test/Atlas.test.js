import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow,mount} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';

const startProperties = {
  createSnackBar: jest.fn()
};

function testInitialAtlasState() {

  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

  let actualMarkerPositions = atlas.state().markerPositions;
  let expectedMarkerPositions = [];

  expect(actualMarkerPositions).toEqual(expectedMarkerPositions);
}

test("Testing Atlas's Initial State", testInitialAtlasState);


function testAddMarkersToMap(){

    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

    let coords = {lat: 36, lng: 118};
    atlas.instance().addMarkersToMap("Home", 36, 118);
    let actualMarkerPositions = atlas.state().markerPositions;

    expect(actualMarkerPositions[0]).toEqual(coords);
}

test("Testing Atlas's AddMarkersToMap method", testAddMarkersToMap)


function testGetBounds(){

    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

    let coords = {lat: 36, lng: 118};
    atlas.instance().getBounds(coords);
    let actualMapCenter = atlas.state().map_center;
    let expectMapCenter = [40.5734, -105.0865]

    expect(actualMapCenter).toEqual(expectMapCenter);
}

test("Testing Atlas's getBounds method", testGetBounds)


function testClearAllMarkers(){

    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

    atlas.instance().addMarkersToMap("Home", 36, 118);
    atlas.instance().clearAllMarkers();
    let expectedMarkerPositions = [];
    let actualMarkerPositions = atlas.state().markerPositions;

    expect(actualMarkerPositions).toEqual(expectedMarkerPositions);
}

test("Testing Atlas's clearAllMarkers method", testClearAllMarkers)


//function testMarkerIsRenderedOnClick() {
//
//  const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);
//
//  let actualMarkerPosition = atlas.state().markerPosition;
//  let expectedMarkerPosition = null;
//
//  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
//
//  let latlng = {lat: 0, lng: 0};
//  simulateOnClickEvent(atlas, {latlng: latlng});
//
//  // expect(atlas.state().markerPosition).toEqual(latlng);
//  // expect(atlas.find('Marker')).toEqual(1); ??
//}
//
//function simulateOnClickEvent(reactWrapper, event) {
//  reactWrapper.find('Map').at(0).simulate('click', event);
//  reactWrapper.update();
//}

//test("Testing Atlas's Initial State", testMarkerIsRenderedOnClick);
//
////function testConvertedString(){
////    let match = "xinyi's";
////    const exampleWrapper = mount(<Atlas/>);
////    let convertedString = exampleWrapper.instance().convertInputString(match);
////    expect(convertedString).toEqual("xinyi_s");
////}
////test("Testing converting punctuation to '_'", testConvertedString);
////
////function testRequestMatch(){
////    let match = "Dave";
////    const exampleWrapper = shallow(<Atlas/>);
////    exampleWrapper.instance().requestMatch(match);
////    const found = exampleWrapper.state().found;
////    expect(found).toEqual(0);
////}
////test ("Testing requestMatch", testRequestMatch);
////
//////function testClearAllMarkers(){
//////    const exampleWrapper = mount(<Atlas/>);
//////    exampleWrapper.instance().clearAllMarkers();
//////    var list = exampleWrapper.state().markerPosition;
//////    expect(list).toEqual(null);
//////}
//////test("Testing clear markers",testClearAllMarkers);
////
////function testDrawLines(){
////    const exampleWrapper = mount(<Atlas/>);
////    var point = exampleWrapper.instance().drawLines(1);
////    expect(point).toEqual(null);
////}
////test("Testing Draw Lines",testDrawLines);
////
////function testHandleClick(){
////  const Wrapper = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>);
////  Wrapper.instance().handleClick();
////}
////test("Testing handleClick",testHandleClick);
////
////function testgetStringMarkerPosition(){
////    var MarkerPos = { lat: 3.0, lng: 3.0 };
////    const Wrapper = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>);
////    Wrapper.instance().getStringMarkerPosition(MarkerPos);
////}
////test("Testing getStringMarkerPosition",testgetStringMarkerPosition);
////
////function testGetMarker(){
////  const Wrapper = mount(<Atlas createSnackBar={startProperties.createSnackBar}/>);
////  Wrapper.instance().getMarker();
////}
////test("Testing handleGetMarker",testGetMarker);
////
////
////
