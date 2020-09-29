import React, {Component} from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';


const whereIsButtonStyle = {
    marginBottom: 10
}

export default class WhereIs extends Component {
    constructor(props){
        super(props);
        this.state = {valueLatitude: ''};
        this.state = {valueLongitude: ''};
        this.handleChangeLatitude = this.handleChangeLatitude.bind(this);
        this.handleChangeLongitude = this.handleChangeLongitude.bind(this);
        this.handleFindLocation = this.handleFindLocation.bind(this);
    }

    handleChangeLongitude(event){
        this.setState({valueLongitude: event.target.valueLongitude});
    }

    handleChangeLatitude(event){
            this.setState({valueLatitude: event.target.valueLatitude});

    }
    handleFindLocation(event){
        alert(this.state.value);
        event.preventDefault();
        console.log('clicked!');
    }

    render(){
        return(
            <Col sm="30">
                <Form onClick = {this.handleFindLocation}>
                    <FormGroup>
                        <Label for="Longitude">Longitude</Label>
                        <Input type="Longitude"
                                name="Longitude"
                                id="Longitude"
                                placeholder="Enter Longitude"
                                value = {this.state.valueLongitude}
                                onChange = {this.handleChangeLongitude}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Latitude">Latitude</Label>
                        <Input type="Latitude"
                                name="Latitude"
                                id="Latitude"
                                placeholder="Enter Latitude"
                                value = {this.state.valueLatitude}
                                onChange = {this.handleChangeLatitude}/>
                    </FormGroup>
                </Form>
                <Button color="primary" style = {whereIsButtonStyle}>Find Location</Button>{' '}
            </Col>
        );
    }
}

