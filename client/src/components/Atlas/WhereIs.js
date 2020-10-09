import React, {Component} from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';



const whereIsButtonStyle = {
    marginBottom: 10
}

export default class WhereIs extends Component {
    constructor(props){
        super(props);
        this.state = {
            Longitude: '',
            Latitude: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event){

    }
    handleClick(txt) {
        this.handleSubmit();
        console.log('Click happened' + txt);
      }


    render(){
        return(
            <Col sm="30">
                <Form onSubmit = {this.handleSubmit}>
                    <FormGroup>
                        <Label for="Longitude">Longitude</Label>
                        <Input type="text"
                                name="Longitude"
                                placeholder="Enter Longitude"
                                value = {this.state.valueLongitude}
                                onChange ={(e) => {this.handleChange(e)}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Latitude">Latitude</Label>
                        <Input type="text"
                                name="Latitude"
                                placeholder="Enter Latitude"
                                value = {this.state.valueLatitude}
                                onChange = {this.handleChange}/>
                    </FormGroup>
                    <Button color="primary" style = {whereIsButtonStyle} onClick={ (e) => {this.handleClick();}}>
                    Find Location
                    </Button>
                </Form>
            </Col>
        );
    }
}

