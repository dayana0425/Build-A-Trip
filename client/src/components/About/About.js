import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {CLIENT_TEAM_NAME} from "../../utils/constants";
import DaianaAbout from './Daiana-About.js'
import XinyiAbout from './XinyI-About.js'
import ChenAbout from './Chen-About.js'
import MattAbout from './Matt-About.js'

export default class About extends Component {

    render() {
      return (
        <Container id="about">
          <Row>
            <Col>
              <h1> About: {CLIENT_TEAM_NAME} </h1>
                <h2> Mission Statement </h2>
                <p> Insert Mission Statement Here </p>
                <h2> Team Members </h2>
                <DaianaAbout name="Daiana Bilbao" />

                <XinyiAbout name = "Xinyi Wang"/>
                <h4> Team Member #3 Name </h4>
                <p> Team Member #3 Bio </p>

                <ChenAbout name = "Chen Wang" />
                <h4> Team Member #5 Name </h4>
                <p> Team Member #4 Bio </p>
          
                <MattAbout name = "Matt Vildibill" />
            </Col>
            <Col id="closeAbout" xs='auto' >
              <Button color="primary" onClick={this.props.closePage} xs={1}>
                Close
              </Button>
            </Col>
          </Row>
        </Container>
      )
    }
}
