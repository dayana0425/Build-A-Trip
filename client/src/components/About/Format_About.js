import React from 'react';
import { Media } from 'reactstrap';

const containerStyle = {
    marginTop:10
}

const imgStyle = {
    marginRight: 10
}

export function aboutFormat (name, myImage, alert, bio) {
    return (
            <Media style = {containerStyle} >
              <Media left top href='#'>
                 <Media src={myImage} style={imgStyle} alt = {alert}/>
              </Media>
              <Media body>
                    <Media heading>
                        {name}
                    </Media>
                    {bio}
              </Media>
            </Media>
    );
}