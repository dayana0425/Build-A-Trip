import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow,mount} from 'enzyme';

import App, {HookCaller} from '../src/components/App';

function testChildComponentExists() {
  const wrapper = shallow(<App/>);
  expect(wrapper.contains(<HookCaller/>)).toEqual(true);
}

test('Testing to see if a HookCaller is rendered with App', testChildComponentExists);

