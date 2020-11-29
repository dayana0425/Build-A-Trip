import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow,mount} from 'enzyme';
import {Container} from 'reactstrap';
import About from '../src/components/About/About';

function testRender(){
    const about = shallow(<About/>);
    expect(about.exists(Container)).toEqual(true);
}
test("Testing to see if Container is rendered with About", testRender);