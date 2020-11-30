import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow,mount} from 'enzyme';
import DragAndDropListView, {RemovableIcon, HandleIcon} from '../src/components/Atlas/DragAndDropListView';
import { List } from "react-movable";

function testRender(){
    const dragAndDropListView = shallow(<DragAndDropListView/>);
    expect(dragAndDropListView.exists(List)).toEqual(true);
}
test("Test render component",testRender);

function testRemovableIcon(){
    const expectedValue = <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#555"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-x-circle"
                            >
                            <title>Remove</title>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
    expect(RemovableIcon()).toEqual(expectedValue);
}
test('Test removableIcon component',testRemovableIcon);


function testHandleIcon(){
    const expectedValue =  <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#555"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-move"
                              >
                              <polyline points="5 9 2 12 5 15" />
                              <polyline points="9 5 12 2 15 5" />
                              <polyline points="15 19 12 22 9 19" />
                              <polyline points="19 9 22 12 19 15" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <line x1="12" y1="2" x2="12" y2="22" />
                              </svg>
    expect(HandleIcon()).toEqual(expectedValue);
}
test('Test handleIcon component',testHandleIcon);


