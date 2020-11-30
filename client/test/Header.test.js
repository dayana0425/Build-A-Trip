import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow,mount} from 'enzyme';
import {Container} from "reactstrap";

import Header from '../src/components/Margins/Header';

function testRender(){
    const header = shallow(<Header/>);
    expect(header.exists(Container)).toEqual(true);
}
test('Test Render rendering Container', testRender);
