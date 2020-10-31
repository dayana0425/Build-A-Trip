import React, {Component} from 'react';
import { Button,  Alert, InputGroup, InputGroupAddon, Input, Table } from 'reactstrap';
import {sendServerRequest} from "../../utils/restfulAPI";

export default class SearchPlaces extends Component{
    constructor(props){
        super(props)
        this.state = {
           searching: null,
           places: [], //for find places component
           found: 0,
           results: 0,
        }
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <Input type="text"
                        name="searching"
                            value={this.match}
                            placeholder="Enter Place"
                            onChange={(e) => {this.handleChange(e)}}/>
                    <InputGroupAddon addonType="append">
                    <Button color="primary" style={this.buttonStyleTable} onClick={(e) => {this.handleClick(e)}}>Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <Table bordered hover striped>
                        {this.renderTableHeader()}
                        <tbody>{this.renderTable(this.state.places)}</tbody>
                    </Table>
                    <Alert color="success">{this.state.found} results found. Currently displaying {this.state.results} of the most relevant results.</Alert>
                </div>
            );
        }

     requestMatch(inputValue) {
            const {places} = this.state;
            sendServerRequest({requestType: "find", requestVersion: 4, match: inputValue, limit: 5, places: []})
                .then(find => {
                    if (find) {
                        this.setState({places: find.data.places, found: find.data.found, results: find.data.places.length});
                        {
                            this.renderTable(places)
                        }
                    } else {
                        console.error('Error');
                    }
                });
        }


    handleChange = (event) => {
       this.setState({[event.target.name]: event.target.value});
    }

    handleClick() {
        let match = this.convertInputString(this.state.searching)
        this.requestMatch(match)
    }

    convertInputString(searching) {
        let match = '';
        searching.split("").map(letter => {
            if ((/[a-zA-Z0-9_]/).test(letter))
                match += letter
            else
                match += '_'
        })
        return match;
    }


    renderTableHeader() {
        return (
            <thead>
            <tr>
                <th>Airport Name</th>
                <th> </th>
            </tr>
            </thead>
        )
    }

    renderTable(places) {
        return places.map((place) => {
            const {id, name, longitude, latitude} = place
            return(
                <tr key={id}>
                    <td>
                       {name}
                    </td>
                    <td>
                       <Button variant="primary" onClick={() => {this.props.addMarkersToMap(name, latitude, longitude)}}>Add</Button>
                    </td>
                </tr>
            )
        })
    }





}