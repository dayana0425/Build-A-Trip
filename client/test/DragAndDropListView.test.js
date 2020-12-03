import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow, mount} from 'enzyme';
import DragAndDropListView, {RemovableIcon, HandleIcon} from '../src/components/Atlas/DragAndDropListView';
import { List } from "react-movable";

function testRender(){
    const dragAndDropListView = shallow(<DragAndDropListView/>);
    expect(dragAndDropListView.exists(List)).toEqual(true);
}
test("Test render component",testRender);

function testRemovableIcon(){
    const expectedValue = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
    expect(RemovableIcon()).toEqual(expectedValue);
}
test('Test removableIcon component',testRemovableIcon);


function testHandleIcon(){
    const expectedValue = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/></svg>
    expect(HandleIcon()).toEqual(expectedValue);
}
test('Test handleIcon component',testHandleIcon);


