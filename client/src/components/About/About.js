import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {CLIENT_TEAM_NAME} from "../../utils/constants";
import DaianaAbout from './Daiana-About.js'
import XinyiAbout from './Xinyi-About.js'
import ChenAbout from './Chen-About.js'
import MattAbout from './Matt-About.js'

export default class About extends Component {

    render() {
      return (
        <Container id="about">
          <Row>
            <Col>
            <Row>
              <Col columnWidth = '2'>
              <h1> About: {CLIENT_TEAM_NAME} </h1>
              </Col>
              <Col id="closeAbout" xs='auto' >
                <Button color="primary" onClick={this.props.closePage} xs={1}>
                    Close
                </Button>
              </Col>
            </Row>
                <h2> Mission Statement </h2>

                <p> Team Hexadecimal is comprised of aspiring Computer Scientists
                who are dedicated to building not only amazing software projects
                but building amazing software projects the right way by applying
                Clean Code principles to the code we write and utilizing scrum
                development as our process. </p>

                <h2> Team Members </h2>

                <DaianaAbout name="Daiana Bilbao" />

                <XinyiAbout name = "Xinyi Wang"/>

                <ChenAbout name = "Chen Wang" />

                <MattAbout name = "Matt Vildibill" />
            </Col>
          </Row>
        </Container>
      )
    }
}
