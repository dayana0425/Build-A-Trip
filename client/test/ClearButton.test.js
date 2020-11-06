import './jestConfig/enzyme.config.js';
import { Button } from 'reactstrap';
import React from 'react';
import {shallow,mount} from 'enzyme';

import ClearButton from '../src/components/Atlas/ClearButton';

function testButtonExists(){

    const clearButton = shallow(<ClearButton/>);

    expect(clearButton.exists(Button)).toEqual(true);

}

test("Testing to see if Button is rendered with ClearButton", testButtonExists);