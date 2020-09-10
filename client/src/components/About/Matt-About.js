import React from 'react';
import myImage from "./team-member-images/Matt200x200.jpg";
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
                    <Media src={myImage} style={imgStyle} alt="Matt's image" />
              </Media>
              <Media body>
                    <Media heading>
                    {name}
                    </Media>
                        Hello, my name is Matt Vildibill and I am a senior Computer Science student. I look forward to graduating and 
                        entering the work force with my degree. In my free time I really enjoy playing volleyball, going on long bike
                        rides, and hanging out with my friends.
              </Media>
            </Media>
    );
};
