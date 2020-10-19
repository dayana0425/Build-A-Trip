// import React, {Component} from 'react';
// import {InputGroup, InputGroupAddon, Button, Input, Table, Alert } from 'reactstrap';
// import PropTypes from 'prop-types';
//
// const buttonStyle = {
//     marginBottom: 10
// }
//
// export default class FindPlaces extends Component {
//     render(){
//         return(
//             <div>
//                 <InputGroup>
//                     <Input type="text"
//                            name = "searching"
//                            value = {this.match}
//                            placeholder="Enter the place"
//                            onChange = {(e) => {this.handleChange(e)}}/>
//                 <InputGroupAddon addonType="append">
//                         <Button color="primary" style = {buttonStyle} onClick={(e) => {this.handleClick(e)}}>Search</Button>
//                     </InputGroupAddon>
//                 </InputGroup>
//                 <Table bordered hover striped>
//                     {this.renderTableHeader()}
//                     <tbody>
//                     {/*{this.renderTable(this.props.places)}*/}
//                     </tbody>
//                 </Table>
//                 {this.renderResultsFound(this.props.found, this.props.results)}
//             </div>
//         );
//     }
//
//
//     handleChange(event){
//         console.log(this.props);
//         this.props.handleChange;
//     }
//
//     handleClick(event){
//         console.log("Handle Click");
//         this.props.handleClick();
//     }
//
//     renderTable(places) {
//         return places.map((place) => {
//             const { id, name, municipality, longitude, latitude } = place
//             return (
//                 <tr key={id} onClick={() => {this.props.doSomething(longitude,latitude)}}>
//                     <td>{id}</td>
//                     <td>{name}</td>
//                     <td>{municipality}</td>
//                 </tr>
//             )
//         })
//     }
//
//     renderResultsFound(found, results){
//         return(
//         <Alert color="success">
//             {found} results found. Currently displaying {results} of the most relevant results.
//         </Alert>
//         );
//     }
//
//     renderTableHeader(){
//         return(
//             <thead>
//             <tr>
//                 <th>ID</th>
//                 <th>Airport Name</th>
//                 <th>Municipality</th>
//             </tr>
//             </thead>
//         )
//     }
// };


