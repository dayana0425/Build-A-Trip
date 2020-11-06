import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow,mount} from 'enzyme';

import AddLocation from '../src/components/Atlas/AddLocation';

function testInitialState() {

    const addLocation = shallow(<AddLocation/>);

    let expectedLat = 0;
    let expectedLng = 0;
    let actualLat = addLocation.state().lat;
    let actualLng = addLocation.state().lng;

    expect(actualLat).toEqual(expectedLat);
    expect(actualLng).toEqual(expectedLng);
}

test("Testing initial state value", testInitialState);


function testChangeLatitude(){

    const addLocation = shallow(<AddLocation/>);

    let latitude = 38;
    simulateOnClickEvent(addLocation, latitude);

    expect(addLocation.state().lat).toEqual(latitude);
}

//function simulateOnClickEvent(addLocation, event){
//
//}
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