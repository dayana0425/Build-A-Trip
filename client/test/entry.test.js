import './jestConfig/enzyme.config.js';
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,mount} from 'enzyme';

import App, {HookCaller} from '../src/components/App';

it('renders without crashing', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
   // require('../index');
});