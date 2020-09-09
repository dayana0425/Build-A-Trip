import React from 'react';
import myImage from "./team-member-images/Xinyi.jpg";
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
                    <Media src={myImage} style={imgStyle} alt="Xinyi's image" />
              </Media>
              <Media body>
                    <Media heading>
                    {name}
                    </Media>
                        Hi, I'm Xinyi Wang, a senior student who majored in Computer Science with a minor in Mathematics. My ultimate
                        goal is do better than yesterday. In my spare time, I like baking some snacks, doing some painting stuff and
                        some outdoor activities, hiking, camping, etc.
              </Media>
            </Media>
    );
};