import React from 'react';
import myImage from "./team-member-images/Chen_200x200.jpg";
import { Media } from 'reactstrap';

const imgStyle = {
    marginRight: 10
}

const containerStyle = {
    marginTop:10
}

export default ({name}) => {
    return (
        <Media style = {containerStyle} >
            <Media left top href="#">
                <Media src={myImage} style={imgStyle} alt="Chen's image" />
            </Media>
            <Media body>
                <Media heading>
                    {name}
                </Media>
                My name is Chen Wang, a senior computer science student. I like to work on math problems because after
                I finishing these problems I will feel a sense of accomplishment. I also enjoy spending time with my
                friends to enhance our friendship.
            </Media>
        </Media>
    );
};