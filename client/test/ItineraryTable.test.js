import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow,mount} from 'enzyme';

import ItineraryTable from '../src/components/Atlas/ItineraryTable';
import {Button,Collapse} from 'reactstrap';

//helper function


function simulateOnClick(button,parentWrapper){
    button.simulate('click');
    parentWrapper.update();
}

//function simulateOnChange(input,value,parentWrapper){
//    input.simulate('change',value);
//    parentWrapper.update();
//}

//testing function

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


function testChangeTripName(){
     const itineraryTable = shallow(<ItineraryTable/>);
     itineraryTable.instance().changeTripName(itineraryTable.find('Input').at(0).simulate('change',{target: { name: 'options', value: 'My trip'}}));
     expect(itineraryTable.state().options.title).toEqual("My trip");
}
test("Testing changeTripName function",testChangeTripName);

