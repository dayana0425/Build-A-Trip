import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import MyLabel from './FindLabel.js';
const findDistanceButtonStyle = {
    marginBottom: 10
}

export default () => {
    return(
    <Col sm="30">
        <Form>
            <MyLabel labelName = "Location 1" inputName = "Location_1"/>
            <MyLabel labelName = "Location 2" inputName = "Location_2"/>
        </Form>
        <Button color="primary" style = {findDistanceButtonStyle}>Find Distance</Button>{' '}
    </Col>
    );
}
