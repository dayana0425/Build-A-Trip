import React from 'react';
import myImage from "./team-member-images/Xinyi.jpg";
import { Media } from 'reactstrap';
import Picture from './Format.js';

const containerStyle = {
    marginTop:10
}

export default ({name}) => {
    return (
            <Media style = {containerStyle} >
              <Picture picture = {myImage} alert = "Xinyi's info"/>
              <Media body>
                    <Media heading>
                        {name}
                    </Media>
                        Hi, I'm Xinyi Wang, a senior student who majors in Computer Science with a minor in Mathematics. My ultimate
                        goal is do better than yesterday. In my spare time, I like baking snacks, painting things and
                        doing outdoor activities like hiking, camping, etc.
              </Media>

             </Media>
    );
};