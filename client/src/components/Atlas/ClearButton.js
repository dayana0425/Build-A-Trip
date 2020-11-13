import React, {Component} from 'react';
import {Button, Col, Row} from 'reactstrap';

export default class ClearButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Row>
                <Col>
                    <Button color="primary" style={{marginTop: 10}} onClick={this.props.toggle}>
                        Show Line
                    </Button>
                    <Button color="primary" style={{marginTop: 10, marginLeft: 10}} onClick= {this.props.clearAllMarkers}>
                        Reset
                    </Button>
                </Col>
            </Row>

        )
    }
}