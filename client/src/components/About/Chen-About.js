import React from 'react';
import myImage from "./team-member-images/Chen_200x200.jpg";
import { Media } from 'reactstrap';
import Picture from "./Format.js";

const containerStyle = {
    marginTop:10
}

export default ({name}) => {
    return (
        <Media style = {containerStyle} >
            <Picture picture = {myImage} alert = "Chen's info"/>
            <Media body>
                <Media heading>
                    {name}
                </Media>
                My name is Chen Wang, I am a senior Computer Science student. In my free time I like to work on math problems because after
                I finish these problems I feel a sense of accomplishment. I also enjoy spending time with my
                friends to enhance our friendship.
            </Media>
        </Media>
    );
};