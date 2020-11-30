import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow,mount} from 'enzyme';
import {Table, InputGroup} from 'reactstrap';
import SearchPlaces from '../src/components/Atlas/SearchPlaces';

function simulateOnClick(button,parentWrapper){
    button.simulate('click');
    parentWrapper.update();
}

function simulateOnChange(input,event,parentWrapper){
    input.simulate('change',event);
    parentWrapper.update();
}

function testConvertInputString(){
    const searchPlaces = shallow(<SearchPlaces/>);
    let testString = 'Dave\'s';
    let returnString = searchPlaces.instance().convertInputString(testString);
    let expectedString = 'Dave_s';
    expect(returnString).toEqual(expectedString);
}
test("Test convertInputString works", testConvertInputString);


function testHandleClick(){
    const searchPlaces = shallow(<SearchPlaces/>);
    searchPlaces.setState({searching: 'Dave\'s'});
    simulateOnClick(searchPlaces.find('Button').at(0), searchPlaces);
}
test("Test Search Button and handleClick method", testHandleClick);


function testHandleChange(){
    const searchPlaces = shallow(<SearchPlaces/>);
    const event = {target:{name:'searching', value: 'happy place'}};
    expect(searchPlaces.state().searching).toEqual(null);
    searchPlaces.instance().handleChange(event);
    expect(searchPlaces.state().searching).toEqual('happy place');
}
test("Test handleChange method", testHandleChange);


function testRequestMatch(){
    const searchPlaces = shallow(<SearchPlaces/>);
    const match = 'Dave';
    searchPlaces.setState({filters: [{value: 'United States', label: 'United States'}]})
    searchPlaces.instance().requestMatch(match);
}
test("Test requestMatch Method", testRequestMatch);


function testHandleFilter(){
    const searchPlaces = shallow(<SearchPlaces/>);
    expect(searchPlaces.state().filters).toEqual(null);
    searchPlaces.instance().handleFilter('China');
    expect(searchPlaces.state().filters).toEqual('China');
}
test('Test handleFilter Method can change filters',testHandleFilter);


function testHandleFilterType(){
    const searchPlaces = shallow(<SearchPlaces/>);
    expect(searchPlaces.state().filters).toEqual(null);
    searchPlaces.instance().handleFilterType('Airport');
    expect(searchPlaces.state().filtersType).toEqual('Airport');
}
test('Test handleFilter Method can change filtersType ',testHandleFilterType);


function testRequestFilter(){
    const searchPlaces = shallow(<SearchPlaces/>);
    searchPlaces.instance().requestFilter();
}
test('Test handleFilter Method',testRequestFilter);


function testRenderTable(){
    const searchPlaces = shallow(<SearchPlaces/>);
    const places = [{name: "Home", latitude: "44.1", longitude: "130.2"},
                    {name: "Dave's Airport", latitude:"40.03",longitude:"-105.1"}]
    searchPlaces.instance().renderTable(places);
}
test('Test handleFilter Method',testRenderTable);


function testRenderExists(){
     const searchPlaces = shallow(<SearchPlaces/>);
     searchPlaces.setState({filterCountries: ['United States', 'China']})
     expect(searchPlaces.exists(InputGroup)).toEqual(true);
}
test('Test render rendering an InputGroup',testRenderExists);

//function testAddButton(){
//    const searchPlaces = shallow(<SearchPlaces
//                                 addMarkersToMap = {(name, latitude, longitude) => {markers:[name,latitude,longitude]}}/>);
//    const places = [{name: "Home", latitude: "44.1", longitude: "130.2"},
//                        {name: "Dave's Airport", latitude:"40.03",longitude:"-105.1"}]
//    const renderTable = searchPlaces.instance().renderTable(places);
//    expect(renderTable.exists(Button)).toEqual(true);
//}
//test('Test add Button',testAddButton);
// How to test the button inside a method


function testHandleChangeInput(){
    const searchPlaces = shallow(<SearchPlaces/>);
    const event = {target:{name:'searching', value: 'happy place'}};
    expect(searchPlaces.state().searching).toEqual(null);
    simulateOnChange(searchPlaces.find('Input').at(0),event,searchPlaces,);
    searchPlaces.instance().handleChange(event);
    expect(searchPlaces.state().searching).toEqual('happy place');
}
test("Test handleChange method", testHandleChangeInput);




