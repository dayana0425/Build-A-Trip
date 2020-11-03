import React, {Component} from 'react';
import { Col, Button, Form, Input } from 'reactstrap';

export default class AddLocation extends Component{

    constructor(props){
        super(props)
        this.state = {
            lat: 0,
        }
        this.handleChangeLatitude = this.handleChangeLatitude.bind(this)
        this.handleChangeLongitude = this.handleChangeLongitude.bind(this)
        this.handleCoordinateSubmit = this.handleCoordinateSubmit.bind(this)
    }

    handleChangeLatitude = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeLongitude = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleCoordinateSubmit() {
        this.props.addMarkersToMap("User's Typed Coordinates", this.state.lat, this.state.lng);
    }

     render() {
         return (
             <Col sm="30">
                 <Form>
                     <Input type="text" name="lat" style = {{marginBottom: 10}} value={this.lat} placeholder="Enter Latitude" onChange={(e) => {
                           this.handleChangeLatitude(e)
                     }}/>
                     <Input type="text" name="lng" value={this.lng} placeholder="Enter Longitude" onChange={(e) => {
                           this.handleChangeLongitude(e)
                     }}/>
                 </Form>
                    <Button color="primary" style={{marginTop: 10, marginBottom: 10}} onClick={() => this.handleCoordinateSubmit()}>
                        Add Location
                    </Button>
             </Col>
         )
     }

}