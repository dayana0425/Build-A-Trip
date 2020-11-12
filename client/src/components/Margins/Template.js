import React, { Component } from "react";
import { Col, Row } from "reactstrap";

export function tableFormat(typeName, valueName, ){
    return(
    <Row className="m-2">
       <Col xs ={3}>
          {typeName}
       </Col>
       <Col xs = {9}>
           {valueName}
       </Col>
    </Row>
    )
};




