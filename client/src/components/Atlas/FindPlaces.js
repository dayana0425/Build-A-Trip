import React, {Component} from 'react';
import { InputGroup, InputGroupAddon, Button, Input, Table, Alert} from 'reactstrap';
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
            limit: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event){
         this.setState({
                [event.target.name]: event.target.value
         });
    }

    handleClick(){
        this.requestMatch(this.state.searching);
    }

    render(){
        const {places,found, limit } = this.state;
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

                <Table bordered striped>
                    {this.renderTableHeader()}
                    <tbody>
                    {this.renderTable(places)}
                    </tbody>
                </Table>
                {this.renderResultsFound(found, limit)}
            </div>
        );
    }

    requestMatch(inputValue) {
        const {places} = this.state;
        sendServerRequest({requestType: "find", requestVersion: 2, match: inputValue, limit: 5, places: []})
            .then(find => {
                if (find) {
                    this.setState({places: find.data.places, found: find.data.found, limit: find.data.limit});
                    {this.renderTable(places)}
                } else {
                   console.log('Error');
                }
            });
    }

    renderTable() {
        return this.state.places.map((place, index) => {
            const { id, name, municipality } = place
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{municipality}</td>
                </tr>

            )
        })
    }

    renderResultsFound(found, limit){
        return(
        <Alert color="success">
            {found} results found, currently displaying {limit} of the most relevant results.
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

