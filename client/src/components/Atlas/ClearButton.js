import React, {Component} from 'react';
import {Button} from 'reactstrap';

export default class ClearButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Button color="primary" style={this.props.buttonStyleReset} onClick= {this.props.clearAllMarkers}>
                Reset
            </Button>
        )
    }
}