import React, {Component} from 'react';
import { InputGroup, InputGroupAddon, Button, Input, Table} from 'reactstrap';
import {isJsonResponseValid, sendServerRequest} from "../../utils/restfulAPI";
import * as findSchema from "../../../schemas/FindResponse.json";


const buttonStyle = {
    marginBottom: 10
}

export default class FindPlaces extends Component {
    constructor(props){
        super(props);
        this.state = {
            searching:'',
            validServer: null,
            find: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event){
         this.setState({
                [event.target.name]: event.target.value
         });
    }

    handleClick(event){
        this.requestMatch(this.state.searching);
    }

    render(){
        return(
            <div>
                <InputGroup>
                    <Input type="text"
                           name = "searching"
                           value = {this.state.match}
                           placeholder="Enter the place"
                           onChange = {(e) => {this.handleChange(e)}}/>
                <InputGroupAddon addonType="append">
                        <Button color="primary" style = {buttonStyle} onClick={(e) => {this.handleClick();}}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
                {this.renderTable()}

            </div>
        );
    }

    requestMatch(inputValue) {
        sendServerRequest({requestType: "find", requestVersion: 2, match: inputValue, limit: 3, places: []})
            .then(find => {
                if (find) {
                    this.processConfigResponse(find.data);
                    console.log(find.data);
                } else {
                    this.setState({validServer: true, find: find});
                }
            });
    }

    processConfigResponse(find) {
        if(!isJsonResponseValid(find, findSchema)) {
            this.setState({validServer: false, find: false});
        } else {
            this.setState({validServer: true, find: find});
        }
    }

    renderTable() {
    return(
        <Table hover>
        <thead>
        <tr>
            <th>#</th>
            <th>Airport Name</th>
            <th>Longitude</th>
            <th>Latitude</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Fort Collins </td>
            <td>43.2 </td>
            <td>42.3</td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>Denver</td>
            <td>34.2</td>
            <td>234.3</td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>Loveland </td>
            <td>80.2</td>
            <td>200.2</td>
        </tr>
        </tbody>
        </Table>
    );
    }


};

