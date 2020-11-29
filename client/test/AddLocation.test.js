import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow,mount} from 'enzyme';

import AddLocation from '../src/components/Atlas/AddLocation';

function simulateOnClick(button,parentWrapper){
    button.simulate('click');
    parentWrapper.update();
}

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


function testHandleCoordinateSubmit(){
     const addLocation = shallow(<AddLocation addMarkersToMap={(info)=>{markerPostions:[info]}}/>);
     addLocation.instance().handleCoordinateSubmit();
}
test("Testing handleCoordinateSubmit method", testHandleCoordinateSubmit);


function testRequestCurrentLocation(){
     const addLocation = shallow(<AddLocation addMarkersToMap={(info)=>{markerPostions:[info]}}/>);
     addLocation.instance().requestCurrentLocation();
}
test("Testing requestCurrentLocation", testRequestCurrentLocation);


function testTwoButtons(){
    const addLocation = shallow(<AddLocation addMarkersToMap={(info)=>{markerPostions:[info]}}/>);
    simulateOnClick(addLocation.find('Button').at(0), addLocation);
    simulateOnClick(addLocation.find('Button').at(1), addLocation);
}
test("Testing two buttons", testTwoButtons);


function testHandleChangeLatitude(){
    const addLocation = shallow(<AddLocation/>);
    const event = {target:{name:'lat', value: '50'}};
    expect(addLocation.state().lat).toEqual(0);
    addLocation.instance().handleChangeLatitude(event);
    expect(addLocation.state().lat).toEqual("50");
}
test("Test changeLatitude method", testHandleChangeLatitude);

function testHandleChangeLongitude(){
    const addLocation = shallow(<AddLocation/>);
    const event = {target:{name:'lng', value: '50'}};
    expect(addLocation.state().lng).toEqual(0);
    addLocation.instance().handleChangeLongitude(event);
    expect(addLocation.state().lng).toEqual("50");
}
test("Test changeLatitude method", testHandleChangeLongitude);



