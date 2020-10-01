import React from 'react';
import myImage from "./team-member-images/Daiana.jpg";
import { Media } from 'reactstrap';
import Picture from "./Format.js";

const imgStyle = {
    marginRight: 10
}

export default ({name}) => {
    return (
        <Media>
            <Picture picture = {myImage} alert = "Daiana's info"/>
            <Media body>
                <Media heading>
                    {name}
                </Media>
                Hello, my name is Daiana. I am a senior student studying Computer Science at Colorado State University.
                I am currently doing an internship at a project management software company in Fort Collins.
                My ultimate goal is to travel the world.
                In my free time I enjoy running, dancing, and watching movies/tv shows.
            </Media>
        </Media>
    );
};