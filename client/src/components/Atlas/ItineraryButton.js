import React, {Component} from 'react';
import {Button} from 'reactstrap';
import ItineraryTable from './ItineraryTable';
export default class ClearButton extends Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            placesForItinerary:[]
        }
        this.toggleIsOpen = this.toggleIsOpen.bind(this)
    }

    toggleIsOpen() {
        this.setState({isOpen:!this.state.isOpen});
    }


   render(){
        return(
            <div>
                <Button color="primary" style={this.props.style} onClick = {this.toggleIsOpen}>
                    Show Itinerary
                </Button>
                <ItineraryTable isOpen = {this.state.isOpen} placesForItinerary = {this.props.placesForItinerary}/>
            </div>
        )
   }
}