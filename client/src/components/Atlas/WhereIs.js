import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';


const whereIsButtonStyle = {
    marginBottom: 10
}

export default () => {
    return(
        <Col sm="30">
            <Form>
                <FormGroup>
                    <Label for="Longitude">Longitude</Label>
                    <Input type="Longitude" name="Longitude" id="Longitude" placeholder="Enter Longitude" />
                </FormGroup>
                <FormGroup>
                    <Label for="Latitude">Latitude</Label>
                    <Input type="Latitude" name="Latitude" id="Latitude" placeholder="Enter Latitude" />
                </FormGroup>
            </Form>
            <Button color="primary" style = {whereIsButtonStyle}>Find Location</Button>{' '}
        </Col>
    );
}

