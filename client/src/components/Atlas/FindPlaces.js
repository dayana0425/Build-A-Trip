import React, {Component} from 'react';
import {InputGroup, InputGroupAddon, Button, Input, Table, Alert } from 'reactstrap';
import {sendServerRequest} from "../../utils/restfulAPI";

const buttonStyle = {
    marginBottom: 10
}

export default class FindPlaces extends Component {
    constructor(props){
        super(props);
        this.state = {
            searching: '',
            places: [],
            found: 0,
            results: 0,
            markerPosition: null

        }
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
        const {places,found, results} = this.state;
        return(
            <div>
                <InputGroup>
                    <Input type="text"
                           name = "searching"
                           value = {this.state.match}
                           placeholder="Enter the place"
                           onChange = {(e) => {this.handleChange(e)}}/>
                <InputGroupAddon addonType="append">
                        <Button color="primary" style = {buttonStyle} onClick={(e) => {this.handleClick(e);}}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
                <Table bordered hover striped>
                    {this.renderTableHeader()}
                    <tbody>
                    {this.renderTable(places)}
                    </tbody>
                </Table>
                {this.renderResultsFound(found, results)}
            </div>
        );
    }

    requestMatch(inputValue) {
        const {places} = this.state;
        sendServerRequest({requestType: "find", requestVersion: 2, match: inputValue, limit: 5, places: []})
            .then(find => {
                if (find) {
                    this.setState({places: find.data.places, found: find.data.found, results: find.data.places.length});
                    {this.renderTable(places)}
                } else {
                   console.log('Error');
                }
            });
    }

    renderTable() {
        return this.state.places.map((place) => {
            const { id, name, municipality, longitude, latitude } = place
            return (

                <tr key={id} onClick={() => {doSomething(longitude,latitude)}}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{municipality}</td>
                </tr>

            )
        })
    }

    renderResultsFound(found, results){
        return(
        <Alert color="success">
            {found} results found. Currently displaying {results} of the most relevant results.
        </Alert>
        );
    }

    renderTableHeader(){
        return(
            <thead>
            <tr>
                <th>ID</th>
                <th>Airport Name</th>
                <th>Municipality</th>
            </tr>
            </thead>
        )
    }

};

function doSomething(long, lat) {
    alert('long: ' + long + ' lat: ' + lat);
}