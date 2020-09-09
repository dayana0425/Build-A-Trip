import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {CLIENT_TEAM_NAME} from "../../utils/constants";
import XinyiImage from './team-member-images/Xinyi.jpg';
import DaianaAbout from './Daiana-About.js'


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
                <h4> Xinyi Wang </h4>
                <img src={XinyiImage} alt="Xinyi's image"  />
                <p> I'm Xinyi Wang, a senior student who majored in computer science with a minor in mathematics.
                In my spare time, I like doing some outdoor activities. Like hiking, camping and etc. Besides this,
                I also like baking some snacks and doing some painting stuff in my free time.  </p>
                <h4> Team Member #3 Name </h4>
                <p> Team Member #3 Bio </p>
                <h4> Team Member #4 Name </h4>
                <p> Team Member #4 Bio </p>
                <h4> Team Member #5 Name </h4>
                <p> Team Member #4 Bio </p>
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
