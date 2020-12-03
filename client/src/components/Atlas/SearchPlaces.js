import React, {Component} from 'react';
import Select from 'react-select';
import { Button,  Alert, InputGroup, InputGroupAddon, Input, Table } from 'reactstrap';
import {sendServerRequest} from "../../utils/restfulAPI";


export default class SearchPlaces extends Component{
    constructor(props){
        super(props)
        this.requestFilter()
        this.state = {
           searching: null,
           places: [], //for find places component
           found: 0,
           results: 0
        }
    }

    render() {
        let filter = this.state.filterCountries;
        let options = [];
        let type = []
        var x;

        if(filter){
        filter.forEach(x =>{
            options.push({ value: x, label: x})
        })
        }

        return (
            <div>
                <InputGroup>
                    <Input type="text"
                            name="searching"
                            value={this.match}
                            placeholder="Enter Place"
                            onChange={(e) => {this.handleChange(e)}}/>
                    <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={(e) => {this.handleClick(e)}}>Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                       <Select
                       options= {options}
                       placeholder="Select Countries..."
                       isMulti
                       onChange={this.handleFilter}/>
                       <Select
                       options= {[{value:"airport", label:"airport"},{value:"balloonport", label:"balloonport"},{value:"heliport", label:"heliport"}]}
                       placeholder="Select Type..."
                       isMulti
                       onChange={this.handleFilterType}/>
                    <Table bordered hover striped>
                        {this.renderTableHeader()}
                        <tbody>{this.renderTable(this.state.places)}</tbody>
                    </Table>
                    <Alert color="success">{this.state.found} results found. Currently displaying {this.state.results} of the most relevant results.</Alert>
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
            var x;

            if(options){
                options.forEach( x => {
                    filters.push(this.convertInputString(x.label));
                })
            }

            let types = [];
            let optionsType = this.state.filtersType;
            var x;

            if(optionsType){
                optionsType.forEach( x => {
                    types.push(this.convertInputString(x.label));
                })
            }

            sendServerRequest({requestType: "find", requestVersion: 4, match: inputValue, limit: 5, places: [], narrow: {type: types, where: filters}})
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
                <th>Places</th>
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
                        <Button style={buttonStyles} onClick={() => {this.props.addMarkersToMap(name, latitude, longitude)}}><Add></Add></Button>{' '}
                        {name}
                    </td>
                </tr>
            )
        })
       }
    }

export const Add = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
);

const buttonStyles = {
    border: 'none',
    margin: 0,
    padding: 2,
    width: 'auto',
    overflow: 'visible',
    cursor: 'pointer',
    background: 'transparent'
};