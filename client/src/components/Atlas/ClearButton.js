import React, {Component} from 'react';
import {Button} from 'reactstrap';

export default class ClearButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Button color="primary" style={{marginTop: 10, marginBottom: 10}} onClick= {this.props.clearAllMarkers}>
                Clear
            </Button>
        )
    }
}