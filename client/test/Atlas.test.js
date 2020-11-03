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

function testClearAllMarkers(){

    const atlas = shallow(<Atlas createSnackBar={startProperties.createSnackBar}/>);

    atlas.instance().addMarkersToMap("Home", 36, 118);
    atlas.instance().clearAllMarkers();
    let expectedNumberOfMarker = 1;
    let actualMarkerPositions = atlas.state().markerPositions.length;

    expect(actualMarkerPositions).toEqual(expectedNumberOfMarker);
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

