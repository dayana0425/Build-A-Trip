import React, {Component} from 'react';
import { InputGroup, InputGroupAddon, Button, Input, Table} from 'reactstrap';
import * as findSchema from "../../../schemas/FindResponse.json";
import {isJsonResponseValid, sendServerRequest} from "../../utils/restfulAPI";


const buttonStyle = {
    marginBottom: 10
}

export default class FindPlaces extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <InputGroup>
                    <Input />
                    <InputGroupAddon addonType="append">
                        <Button color="primary" style = {buttonStyle} onClick={this.hello("Dave")}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
                <Table hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

    hello(inputValue) {
        sendServerRequest({requestType: "find", requestVersion: 2, match: inputValue, limit: 3})
            .then(find => {
                if (find) {
                    console.log(find.data);
                } else {
                    console.log("hello");
                }
            });
        console.log("Fail");

    }

};

