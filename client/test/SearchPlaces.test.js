import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow,mount} from 'enzyme';

import SearchPlaces from '../src/components/Atlas/SearchPlaces';

function testConvertInputString(){

    const searchPlaces = shallow(<SearchPlaces/>);

    let testString = 'Dave\'s';
    let returnString = searchPlaces.instance().convertInputString(testString);
    let expectedString = 'Dave_s';

    expect(returnString).toEqual(expectedString);
}

test("Test convertInputString works", testConvertInputString);



