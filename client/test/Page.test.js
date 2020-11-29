import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow,mount} from 'enzyme';
import Header from '../src/components/Margins/Header';
import Page from '../src/components/Page';

function testHeaderExists(){
    const page = shallow(<Page/>);
    expect(page.exists(Header)).toEqual(true);
}
test("Testing to see if Button is rendered with ClearButton", testHeaderExists);


function testToggleAbout(){
    const page = shallow(<Page/>);
    page.instance().toggleAbout();
}
test("test toggleAbout function", testToggleAbout);


function testRenderAbout(){
    const page = shallow(<Page/>);
    page.instance().renderAbout();
}
test("test renderAbout function", testRenderAbout);


function testRenderAtlas(){
    const page = shallow(<Page/>);
    page.instance().renderAtlas();
}
test("test renderAtlas function", testRenderAtlas);




