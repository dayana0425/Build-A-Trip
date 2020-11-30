import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow,mount} from 'enzyme';
import DragAndDropListView from '../src/components/Atlas/DragAndDropListView';
import { List } from "react-movable";

function testRender(){
    const dragAndDropListView = shallow(<DragAndDropListView/>);
    expect(dragAndDropListView.exists(List)).toEqual(true);
}
test("Test render component",testRender);


