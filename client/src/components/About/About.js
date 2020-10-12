import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {CLIENT_TEAM_NAME} from "../../utils/constants";
import {aboutFormat} from './Format_About.js'
{/*import DaianaAbout from './Daiana-About.js'
import XinyiAbout from './Xinyi-About.js'
import ChenAbout from './Chen-About.js'
import MattAbout from './Matt-About.js'*/}

import XinyiPic from './team-member-images/Xinyi.jpg'
import DaianaPic from './team-member-images/Daiana.jpg'
import MattPic from './team-member-images/Matt200x200.jpg'
import ChenPic from './team-member-images/Chen_200x200.jpg'
import RyanPic from './team-member-images/Ryan200x200.jpg'
const Statement ={
         MissionStatement:"Team Hexadecimal is comprised of aspiring Computer Scientists who are dedicated to building not only amazing software projects"
                          +"but building amazing software projects the right way by applying Clean Code principles to the code we write and utilizing scrum"
                          +" development as our process. ",
         DaianaBio:"Hello, my name is Daiana. I am a senior student studying Computer Science at Colorado State University. I am currently doing an"
                   +"internship at a project management software company in Fort Collins.My ultimate goal is to travel the world.In my free time I"
                   +" enjoy running, dancing, and watching movies/tv shows.",
         XinyiBio:"Hi, I'm Xinyi Wang, a senior student who majors in Computer Science with a minor in Mathematics. My ultimategoal is do better "
                   +"than yesterday. In my spare time, I like baking snacks, painting things and doing outdoor activities like hiking, camping, etc.",
         MattBio:"Hello, my name is Matt Vildibill and I am a senior Computer Science student. I look forward to graduating and entering the work "
                 +"force with my degree. In my free time I really enjoy playing volleyball, going on long bike rides, and hanging out with my friends.",
         ChenBio:"My name is Chen Wang, I am a senior Computer Science student. In my free time I like to work on math problems because after I finish"
                 +"these problems I feel a sense of accomplishment. I also enjoy spending time with my friends to enhance our friendship.",
         RyanBio:"My name is Ryan Loptien and I am a senior Applied Computing Technology student with a minor in business administration."
                 +"I enjoy playing golf with family and playing all types of board and video games. When I finish school, I hope to get "
                 +"into the cyber-security field."
}

export default class About extends Component {
    render() {
      return (
        <Container id="about">
          <Row>
            <Col>
            <Row>
              <Col columnwidth = '2'>
              <h1> About: {CLIENT_TEAM_NAME} </h1>
              </Col>
              <Col id="closeAbout" xs='auto' >
                <Button color="primary" onClick={this.props.closePage} xs={1}>Close</Button>
              </Col>
            </Row>
                <h2> Mission Statement </h2>
                <p> {Statement.MissionStatement} </p>
                <h2> Team Members </h2>
               {aboutFormat ("Daiana Bilbao",DaianaPic, "Daiana's pic", Statement.DaianaBio)}
               {aboutFormat ("Xinyi Wang",XinyiPic, "Xinyi's pic", Statement.XinyiBio )}
               {aboutFormat ("Matt Vildibill",MattPic, "Matt's pic", Statement.MattBio)}
               {aboutFormat ("Chen Wang",ChenPic, "Chen's pic", Statement.ChenBio )}
               {aboutFormat ("Ryan Loptien", RyanPic, "Ryan's pic",Statement.RyanBio )}
            </Col>
          </Row>
        </Container>
      )
    }
}
