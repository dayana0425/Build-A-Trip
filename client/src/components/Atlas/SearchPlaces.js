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
        //console.log("hello there" + this.state.filter);
        let filter = this.state.filterCountries;
        console.log(filter);
        let options = [];
        let type = []
        var x;
        if(filter){
        filter.forEach(x =>{
            //console.log(x);
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
                       isMulti
                       onChange={this.handleFilter}
                       />
                       <Select
                       options= {[{value:"airport", label:"airport"},{value:"balloonport", label:"balloonport"},{value:"heliport", label:"heliport"}]}
                       isMulti
                       onChange={this.handleFilterType}
                       />


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
                                console.log(config);
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
                    console.log(x);
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