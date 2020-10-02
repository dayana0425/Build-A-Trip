import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

export default({labelName},{inputName}) =>{
    return(
        <FormGroup>
             <Label> {labelName} </Label>
            <Input  name={inputName}  placeholder="Enter Longitude, Latitude" />
        </FormGroup>
    );
}