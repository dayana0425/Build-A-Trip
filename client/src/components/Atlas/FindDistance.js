import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';


const findDistanceButtonStyle = {
    marginBottom: 10
}

export default () => {
    return(
    <Col sm="30">
        <Form>
            <FormGroup>
                <Label for="Location_1">Location 1</Label>
                <Input type="Location_1" name="Location_1" id="ExampleLocation_1" placeholder="Enter Longitude, Latitude" />
            </FormGroup>
            <FormGroup>
                <Label for="Location_2">Location 2</Label>
                <Input type="Location_2" name="Location_2" id="ExampleLocation_2" placeholder="Enter Longitude, Latitude" />
            </FormGroup>
        </Form>
        <Button color="primary" style = {findDistanceButtonStyle}>Find Distance</Button>{' '}
    </Col>
    );
}
