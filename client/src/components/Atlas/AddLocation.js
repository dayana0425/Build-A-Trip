import React, {Component} from 'react';
import { Col, Button, Form, Input } from 'reactstrap';

export default class AddLocation extends Component{

    constructor(props){
        super(props)
        this.handleChangeLatitude = this.handleChangeLatitude.bind(this)
        this.handleChangeLongitude = this.handleChangeLongitude.bind(this)
    }


    handleChangeLatitude = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeLongitude = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }


     render() {
         return (
             <Col sm="30">
                 <Form>
                     <Input type="text" name="lat1" value={this.lat1} placeholder="Enter Latitude" onChange={(e) => {
                           this.handleChangeLatitude(e)
                     }}/>
                     <Input type="text" name="lng1" value={this.lng1} placeholder="Enter Longitude" onChange={(e) => {
                           this.handleChangeLongitude(e)
                     }}/>
                 </Form>
                    <Button color="primary" style={this.props.style} onClick={() => this.props.handleCoordinateSubmit}>
                        Add Location
                    </Button>
             </Col>
         )
     }

}