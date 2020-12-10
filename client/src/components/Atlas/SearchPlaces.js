import React, {Component} from 'react';
import Select from 'react-select';
import {
    Button,
    Alert,
    InputGroup,
    InputGroupAddon,
    Input,
    Table,
    UncontrolledCollapse,
    Card,
    CardBody
} from 'reactstrap';
import {sendServerRequest} from "../../utils/restfulAPI";
import {Information, Add, buttonStyles} from "../../utils/constants";

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
                <InputGroup>
                    <Input
                           type="text"
                           name="searching"
                           value={this.match}
                           placeholder="Enter Place"
                           onChange={(e) => {this.handleChange(e)}}/>
                    <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={() => {this.handleClick()}}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
                <Select
                    styles={{
                        menu: provided => ({ ...provided, zIndex: 9999, marginTop: 0})
                    }}
                    options={options}
                    placeholder="Filter by Country"
                    isMulti
                    onChange={this.handleFilter}/>
                <Select
                    styles={{
                        menu: provided => ({ ...provided, zIndex: 9999, marginTop: 0})
                    }}
                    options={[{value:"airport", label:"airport"},{value:"balloonport", label:"balloonport"},{value:"heliport", label:"heliport"}]}
                    placeholder="Filter by Type"
                    isMulti
                    onChange={this.handleFilterType}/>
                    {(this.state.places.length !== 0) ? this.renderScrollableTable() : ""}
                    {(this.state.places.length !== 0) ? this.renderAlert() : ""}
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
        var request;
        if(inputValue){
               request = {requestType: "find", requestVersion: 4, match: inputValue, limit: 100, places: [], narrow: {type: types, where: filters}};
        }
        else{
               request = {requestType: "find", requestVersion: 4, places: [], narrow: {type: types, where: filters}};

        }
        sendServerRequest(request)
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
        var match = null;
        if( this.state.searching != null){
            match = this.convertInputString(this.state.searching)
        }
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
                maxHeight: '250px',
                overflowY: 'auto'
            }}>
            <Table bordered hover height="auto">
                {this.renderTable()}
                </Table>
            </div>
        );
    }

    renderTable() {
        return this.state.places.map((place, id) => {
            const {name, longitude, latitude, municipality, region, country, url, type} = place
            return(
                <tbody key={id}>
                    <tr key={id}>
                        <td key={id}>
                            <Button style={buttonStyles} onClick={() => {this.props.addMarkersToMap(name, latitude, longitude)}}><Add> </Add></Button>{' '}
                            <Button style={buttonStyles} id="toggler"><Information> </Information></Button>{' '}
                            {name}
                            <UncontrolledCollapse toggler="#toggler">
                                <Card>
                                    <CardBody>
                                        {"Longitude: " + parseFloat(longitude).toFixed(2)}
                                        <br></br>
                                        {"Latitude: " + parseFloat(latitude).toFixed(2)}
                                        <br></br>
                                        {"Type: " + type}
                                        <br></br>
                                        {"Region: " + region}
                                        <br></br>
                                        {"Country: " + country}
                                        <br></br>
                                        {"Municipality: " + municipality}
                                        <br></br>
                                        {"URL: "}
                                        <a href={url}>{"" + url}</a>
                                    </CardBody>
                                </Card>
                            </UncontrolledCollapse>
                        </td>
                    </tr>
                </tbody>
            )
        })
    }

    renderAlert(){
        return(
            <Alert color="success">{this.state.found} results found. Currently displaying {this.state.results} of the most relevant results.</Alert>
        );
    }
}