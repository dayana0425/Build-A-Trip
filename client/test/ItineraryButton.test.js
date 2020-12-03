import './jestConfig/enzyme.config.js';
import React from 'react';
import {shallow,mount} from 'enzyme';
import ItineraryButton from '../src/components/Atlas/ItineraryButton';
import ItineraryTable from '../src/components/Atlas/ItineraryTable'

function testInitialIsOpen(){

    const itineraryButton = shallow(<ItineraryButton/>);

    let expectedIsOpen = false;
    let actualIsOpe= itineraryButton.state().isOpen;
    expect(actualIsOpe).toEqual(expectedIsOpen);

}

test("Testing ItineraryButton's Initial State", testInitialIsOpen);


function testToggleIsOpen(){

     const itineraryButton = shallow(<ItineraryButton/>);

     simulateOnClick(itineraryButton.find('Button'), itineraryButton);
     let firstClick = itineraryButton.state().isOpen;
     expect(firstClick).toEqual(true);

     simulateOnClick(itineraryButton.find('Button'), itineraryButton);
     let secondClick = itineraryButton.state().isOpen;
     expect(secondClick).toEqual(false);
}

function simulateOnClick(button, itineraryButton){
    button.simulate('click');
    itineraryButton.update();
}

test('Testing state change with a button toggle', testToggleIsOpen);


function testItineraryTableExists(){

    const itineraryButton = shallow(<ItineraryButton/>);
    expect(itineraryButton.exists(ItineraryTable)).toEqual(true);

}

test('Testing to see if ItineraryTable is rendered with ItineraryButton', testItineraryTableExists);