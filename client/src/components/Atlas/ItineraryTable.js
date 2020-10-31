import React, {Component} from 'react';
import { Button, InputGroup, Input, InputGroupAddon, Collapse, CardBody, Card } from 'reactstrap';
import { List, ListItem, ListItemText } from '@material-ui/core';
import {sendServerRequest} from "../../utils/restfulAPI";

export default class ItineraryTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            tripName:"",
            roundTrip:0,
            options:null,
            isOpen:'',
            places:null,
            distances:[]
        }
        this.changeTripName = this.changeTripName.bind(this);
        this.requestTrip = this.requestTrip.bind(this);
    }

    changeTripName(event){
        this.setState({[event.target.name]: {title: event.target.value, earthRadius: "3959.0"}});
    }

     requestTrip(event){
            sendServerRequest({
                requestType: "trip",
                requestVersion: 4,
                options:this.state.options,
                places: this.props.placesForItinerary
            })
                .then(trip => {
                    if (trip) {
                        this.setState({distances: trip.data.distances});
                        this.setState({tripName: trip.data.options.title});
                        if (trip.data.distances) {
                            this.setState({roundTrip: trip.data.distances.reduce((a, b) => a + b, 0)})
                        }
                    } else {
                        console.error('Error');
                    }
                });
     }

     getTripTable(places){
         return (
             <List>
                 {places.map((place, index) =>
                     <ListItem key={index}>
                         <ListItemText primary={"Place " + (index + 1) + ": " + place.name}/>
                         <ListItemText primary={"Distance: " + this.state.distances[index]}/>
                     </ListItem>
                 )}
             </List>
         )
     }



    render(){
        return(
            <Collapse isOpen={this.props.isOpen}>
                <Card style={{marginTop: 10}}>
                   <CardBody style={{marginTop: 10}}>
                      <InputGroup>
                         <Input type="text" name="options" value={this.name} placeholder="Enter Trip Name" onChange={(e) => {this.changeTripName(e)}}/>
                         <InputGroupAddon addonType="append">
                                <Button color="primary" style={this.props.buttonStyleTable} onClick={(e) => {this.requestTrip(e)}}>Enter</Button>
                         </InputGroupAddon>
                      </InputGroup>
                      <h2> Itinerary {this.state.tripName} </h2>
                       {this.getTripTable(this.props.placesForItinerary)}
                      <h3>{"Round Trip Distance (mi): " + this.state.distances.reduce(function (a, b) {return a + b;}, 0)}</h3>
                  </CardBody>
                </Card>
            </Collapse>
    )}
}




