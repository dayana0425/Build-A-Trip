import React, {Component} from 'react';
import {Button, Col, Row, Input,  FormText} from 'reactstrap';
import { CSVLink,CSVDownload} from 'react-csv';


export default class File extends Component{

    constructor(props){
        super(props)
        this.uploadTrip = this.uploadTrip.bind(this);
    }

    saveCSVFile(data){
        const { Parser, transforms: { unwind }  } = require('json2csv');
        const place = data.places;
        const fields = ['name', 'latitude','longitude'];
        const transforms = [unwind({ paths: ['name'] })];
        const json2csvParser = new Parser({ fields, transforms });
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

            if(placesForLoadingOntoItinerary.length > 0) {
                this.props.addPlacesToItineraryByArray(placesForLoadingOntoItinerary);
            }
        }
    }

    render(){
        return(
            <Col>
                <Row>
                   <h2>{this.props.tripName + " Itinerary"}</h2>
                </Row>
                <Row>
                    <Input type="file" onChange={(e)=> {this.onUploadChange(e)}}/>
                    <FormText color="muted">*Supports JSON File Format Only</FormText>
                </Row>
                <Button color="primary" onClick={() => {this.saveCSVFile(this.saveFileFormat())}}>
                    CSV
                </Button>
            </Col>
        );
    }

}