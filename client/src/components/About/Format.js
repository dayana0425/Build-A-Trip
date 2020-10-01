import React from 'react';
import { Media } from 'reactstrap';

const imgStyle = {
    marginRight: 10
}


export default ({picture},{alert}) => {
    return(
    <Media left top href="#">
        <Media src={picture} style={imgStyle} alt={alert}/>
    </Media>
    );
}