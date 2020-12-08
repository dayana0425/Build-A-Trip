import React, {Component} from 'react';
import Select from 'react-select';
import { Button, Alert, InputGroup, InputGroupAddon, Input, Table } from 'reactstrap';
import {sendServerRequest} from "../../utils/restfulAPI";
import {Add, buttonStyles} from "../../utils/constants";

export default class SearchPlaces extends Component{
    constructor(props){
        super(props)
        this.requestFilter()
        this.state = {
            searching: null,
            places: [],
            found: 0,
            results: 0,
            filters: null,
            filterCountries: null,
            filtersType: null
        }
    }

    render() {
        let filter = this.state.filterCountries;
        let options = [];
        if(filter){
            filter.forEach(x =>{
                options.push({ value: x, label: x})
            })
        }
        return (
            <div>
                <InputGroup style={{marginBottom: 10}}>
                    <Input type="text"
                           name="searching"
                           value={this.match}
                           placeholder="Enter Place"
                           onChange={(e) => {this.handleChange(e)}}/>
                    <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={() => {this.handleClick()}}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
                <div style={{marginBottom: 10}}>
                <Select
                    options= {options}
                    placeholder="Select Country..."
                    isMulti
                    onChange={this.handleFilter}/>
                <Select
                    options= {[{value:"airport", label:"airport"},{value:"balloonport", label:"balloonport"},{value:"heliport", label:"heliport"}]}
                    placeholder="Select Type..."
                    isMulti
                    onChange={this.handleFilterType}/>
                    {(this.state.places.length !== 0) ? this.renderScrollableTable() : ""}
                    {(this.state.places.length !== 0) ? this.renderAlert() : ""}
                </div>
            </div>
        );
    }

    handleFilter = (selected)=> {
        this.setState({filters:selected})
    }

    handleFilterType = (selected)=> {
        this.setState({filtersType:selected})
    }

    requestFilter() {
        sendServerRequest({requestType: "config", requestVersion: 4})
            .then(config => {
                if (config) {
                    this.setState({filterCountries: config.data.filters.where});
                } else {
                    console.error('Error');
                }
            });
    }

    requestMatch(inputValue) {
        const {places} = this.state;
        let filters = [];
        let options = this.state.filters;
        if(options){
            options.forEach( x => {
                filters.push(this.convertInputString(x.label));
            })
        }
        let types = [];
        let optionsType = this.state.filtersType;
        if(optionsType){
            optionsType.forEach( x => {
                types.push(this.convertInputString(x.label));
            })
        }
        sendServerRequest({requestType: "find", requestVersion: 4, match: inputValue, limit: 100, places: [], narrow: {type: types, where: filters}})
            .then(find => {
                if (find) {
                    this.setState({places: find.data.places, found: find.data.found, results: find.data.places.length});
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

    renderScrollableTable(){
        return(
            <div style={{
                maxHeight: '200px',
                overflowY: 'auto'
            }}>
            <Table bordered hover striped height="200">
                {this.renderTable()}
                </Table>
            </div>
        );
    }

    renderTable() {
        return this.state.places.map((place) => {
            const {id, name, longitude, latitude} = place
            return(
                <tbody>
                <tr key={id}>
                    <td>
                        <Button style={buttonStyles} onClick={() => {this.props.addMarkersToMap(name, latitude, longitude)}}><Add> </Add></Button>{' '}
                        {name}
                    </td>
                </tr>
                </tbody>
            )
        })
    }

    renderAlert(){
        return(
            <Alert style={{marginTop: 10}} color="success">{this.state.found} results found. Currently displaying {this.state.results} of the most relevant results.</Alert>
        );
    }
}