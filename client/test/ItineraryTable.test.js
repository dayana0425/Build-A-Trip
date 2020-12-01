import './jestConfig/enzyme.config.js';

import React,{Component} from 'react';
import {shallow,mount} from 'enzyme';

import ItineraryTable from '../src/components/Atlas/ItineraryTable';
import {Button,Collapse} from 'reactstrap';
import {Map} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

//helper function

function simulateOnClick(button,parentWrapper){
    button.simulate('click');
    parentWrapper.update();
}

function simulateOnChange(input,event,parentWrapper){
    input.simulate('change',event);
    parentWrapper.update();
}


function testSaveFileFormat(){
    const itineraryTable = shallow(<ItineraryTable/>);
    itineraryTable.instance().saveFileFormat();

}
test("Testing saveFileFormat Function", testSaveFileFormat);


function testRender(){
    const itineraryTable = shallow(<ItineraryTable/>);
    expect(itineraryTable.exists(Collapse)).toEqual(true);
}
test("Testing render()", testRender);


function testSimpleRequest(){
    const itineraryTable = shallow(<ItineraryTable/>);
    itineraryTable.setState({options:{ title: "My trip"}});
    itineraryTable.instance().simpleRequest(simulateOnClick(itineraryTable.find('Button').at(0), itineraryTable));
}
test("Testing simpleRequest function",testSimpleRequest);


function testRequestWithOptimize(){
    const itineraryTable = shallow(<ItineraryTable/>);
    itineraryTable.setState({options:{ title: "My trip"}});
    itineraryTable.instance().requestWithOptimize(simulateOnClick(itineraryTable.find('Button').at(1), itineraryTable));
}
test("Testing simpleRequest function",testRequestWithOptimize);


function testClearDistance(){
     const itineraryTable = shallow(<ItineraryTable clearAllMarkers = {() =>{markerPositions:[]}}/>);
     itineraryTable.instance().clearDistance();
     expect(itineraryTable.state().roundTrip).toEqual(0);
}
test("Testing clearDistance function",testClearDistance);


function testGetMarkersForLoadingOntoMap(){
      const itineraryTable = shallow(<ItineraryTable/>);
      const place = [{latitude: '10.1', name: 'place1', longitude:'10.2'},
                     {latitude: '20.1', name: 'place2', longitude:'20.2'},
                     {latitude: '30.1', name: 'place3', longitude:'30.2'}
      ]
      var markerArray = itineraryTable.instance().getMarkersForLoadingOntoMap(place);
      const expectedArray = [{lat: 10.1, lng:10.2},
                             {lat: 20.1, lng:20.2},
                             {lat: 30.1, lng:30.2}
      ]
      expect(markerArray).toEqual(expectedArray);
}
test("Testing getMarkersForLoadingOntoMap function",testGetMarkersForLoadingOntoMap);


function testChangeTripName(){
    const itineraryTable = shallow(<ItineraryTable/>);
    const event = {target:{name:'options', value: 'My trip'}};
    expect(itineraryTable.state().options).toEqual(null);
    simulateOnChange(itineraryTable.find('Input').at(0),event,itineraryTable);
    itineraryTable.instance().changeTripName(event);
    expect(itineraryTable.state().options.title).toEqual('My trip');
}
test("Testing changeTripName function",testChangeTripName);


function testGetTripDistance(){
    const itineraryTable = shallow(<ItineraryTable/>);
    const distanceSet = [1,2,3,4,5,6];
    expect(itineraryTable.state().distances).toEqual([]);
    expect(itineraryTable.state().roundTrip).toEqual(0);
    expect(itineraryTable.state().showDistance).toEqual(false);
    itineraryTable.instance().getTripDistance(distanceSet);
    expect(itineraryTable.state().distances).toEqual(distanceSet);
    expect(itineraryTable.state().showDistance).toEqual(true);
}
test('Test getTripDistance method', testGetTripDistance);

