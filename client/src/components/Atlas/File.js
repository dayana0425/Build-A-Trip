import React, {Component} from 'react';
import {Modal, ModalBody, Button, Col, Row, Input,  FormText} from 'reactstrap';

import { CSVLink,CSVDownload} from 'react-csv';



export default class File extends Component {

    constructor(props) {
        super(props)
         this.state = {
                    categories:[
                        {id:1, value:"JSON"},
                        {id:2, value:"CSV"}
                    ],
                   JSON:false,
                    CSV:false
         }
         this.handleChange = this.handleChange.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)
         this.JSONDownload = this.JSONDownload.bind(this)
         this.CSVDownload = this.CSVDownload.bind(this)
         this.uploadTrip = this.uploadTrip.bind(this);
         this.saveFileFormat = this.saveFileFormat.bind(this);
         this.saveFile = this.saveFile.bind(this);
         this.renderDownload = this.renderDownload.bind(this);
         this.saveCSVFile = this.saveCSVFile.bind(this);
    }

       JSONDownload(){
          this.setState({JSON:!this.state.JSON})
       }

       CSVDownload(){
          this.setState({CSV:!this.state.CSV})
       }

       handleChange(event) {
           var item = event.target.value;
           if(item == 1){
              this.JSONDownload()
           }
           if(item == 2){
              this.CSVDownload()
           }
       }

       handleSubmit(event) {
          if(this.state.JSON){
              this.saveFile(JSON.stringify(this.saveFileFormat()), this.props.tripName, 'application/json')
          }
          if(this.state.CSV){
              this.saveCSVFile(this.saveFileFormat())
          }
       }

    saveCSVFile(data){
        const { Parser, transforms: { unwind }  } = require('json2csv');
        const place = data.places;
        const fields = ['name', 'latitude', 'longitude'];
        const transforms = [unwind({paths: ['name']})];
        const json2csvParser = new Parser({fields, transforms});
        const csv = json2csvParser.parse(place);

        this.saveFile(csv, "trip", 'text/csv')
   }


    saveFileFormat() {
        return {
            requestType: "trip",
            requestVersion: 4,
            options: this.props.options,
            places: this.props.placesForItinerary
        };
    }


     saveFile(fileText, fileName, fileType) {
            let file = new Blob([fileText], {type: fileType});
            let element = document.createElement('a'),
            url = URL.createObjectURL(file);
            element.href = url;
            element.download = fileName;
            document.body.appendChild(element);
            element.click();
            setTimeout(function () {
                document.body.removeChild(element);
                window.URL.revokeObjectURL(url);
            }, 0);
     }


    onUploadChange(event) {
        const testing = new FileReader();
        const scope = this;
        let file = event.target;
        const reader = new FileReader();
        reader.onload = async (event) => {
            const data = (reader.result);
            scope.uploadTrip(data);
        };
        reader.readAsText(file.files[0]);
    }

    uploadTrip(data) {
        const text = JSON.parse(data);
        var loadFilePositions = []
        var markersForLoadingOntoMap = []
        var placesForLoadingOntoItinerary = []
        loadFilePositions.push(text);
        if (loadFilePositions) {
            var positions = loadFilePositions[0].places;
            positions.forEach((place) => {
                let lat = parseFloat(place.latitude);
                let long = parseFloat(place.longitude);
                markersForLoadingOntoMap.push(L.latLng(lat, long));
                placesForLoadingOntoItinerary.push({name: place.name, latitude: lat + '', longitude: long + ''});
            });
            if (markersForLoadingOntoMap.length > 0) {
                this.props.addMarkersByArrayToMap(markersForLoadingOntoMap);
            }

            if (placesForLoadingOntoItinerary.length > 0) {
                this.props.addPlacesToItineraryByArray(placesForLoadingOntoItinerary);
            }
        }
    }

    render() {
        return (
            <Col>
                <Row>
                    <h2>{this.props.tripName + " Itinerary"}</h2>
                </Row>
                <Row>
                    <Input type="file" onChange={(e) => {
                        this.onUploadChange(e)
                    }}/>
                    <FormText color="muted">*Supports JSON File Format Only</FormText>
                    <form onClick = {this.renderDownload}>
                    <input type = "button" value = "Save" onClick = {()=> {this.renderDownload}}/>
                    </form>
                </Row>
            </Col>

        );
    }

   renderDownload(){
       return(
            <Modal isOpen = {true} >
                  <ModalBody>
                       <form onSubmit={this.handleSubmit}>
                            {this.state.categories.map(item => (
                                 <li key = {item.id}>
                                     <label>
                                         <input type="checkbox" value={item.id} onChange={this.handleChange}/>
                                         {item.value}
                                     </label>
                                 </li>
                            ))}
                            <br />
                            <Button color="primary" style={{marginTop: 10, marginBottom: 10}} onClick={this.handleSubmit}>
                                Submit
                            </Button>
                            <Button color="primary" style={{marginTop: 10, marginBottom: 10, marginLeft: 10}} onClick={this.close}>
                                Close
                            </Button>
                       </form>
                    </ModalBody>
              </Modal>
            )
        }
}