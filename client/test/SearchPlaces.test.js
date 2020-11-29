import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow,mount} from 'enzyme';
import {Table} from 'reactstrap';

import SearchPlaces from '../src/components/Atlas/SearchPlaces';

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
    searchPlaces.instance().handleClick;
}
test("Test handleClick method", testHandleClick);


function testHandleChange(){
    const searchPlaces = shallow(<SearchPlaces/>);
    const event = {target:{name:'searching', value: 'happy place'}}
    expect(searchPlaces.state().searching).toEqual(null);
    searchPlaces.instance().handleChange(event);
    expect(searchPlaces.state().searching).toEqual('happy place');
}
test("Test handleChange method", testHandleChange);


function testRequestMatch(){
    const searchPlaces = shallow(<SearchPlaces/>);
    const match = 'Dave';
    searchPlaces.instance().requestMatch(match);
}
test("Test requestMatch Method", testRequestMatch);


function testRenderTableHeader(){
    const searchPlaces = shallow(<SearchPlaces/>);
    searchPlaces.instance().renderTableHeader()
   // expect(searchPlaces.instance().renderTableHeader().exists(<thead/>)).toEqual(true);
}
test("Test renderTabHeader method", testRenderTableHeader);



