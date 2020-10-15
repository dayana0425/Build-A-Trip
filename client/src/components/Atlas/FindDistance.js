import React, {Component} from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import MyLabel from './FindLabel.js';
const findDistanceButtonStyle = {
    marginBottom: 10
}

const EARTH_RADIUS = 3959

export default class FindDistance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat1: 0,
            lng1: 0,
            lat2: 0,
            lng2: 0
        }
    }
    render(){
        return (
            <Col sm="30">
                <Form>
                    <MyLabel labelName = "Location 1" inputName = "Location_1"/>
                    <MyLabel labelName = "Location 2" inputName = "Location_2"/>
                </Form>
                <Button color="primary" style = {findDistanceButtonStyle}
                        onClick={() => this.requestGreatCircleDistance(this.state.lat1, this.state.lng1, this.state.lat2, this.state.lng2)}>
                    Find Distance
                </Button>{' '}
            </Col>
        );
    }
    requestGreatCircleDistance(latitude1, longitude1, latitude2, longitude2){
        let radian;
        let distance;
        let diff_longitude = Math.abs(longitude1 - longitude2);
        radian = Math.acos(
            Math.sin(latitude1)*Math.sin(latitude2) + Math.cos(latitude1)*Math.cos(latitude2)*Math.cos(diff_longitude)
        );
        distance = radian * EARTH_RADIUS;
        return (distance);
    }
}
