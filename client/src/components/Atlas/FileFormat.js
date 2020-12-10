import React, {Component, useState} from "react";
import {Modal, ModalBody, Button} from "reactstrap";

export default class FileFormat extends Component{
    constructor(props){
        super(props);
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
          if(JSON){

          }
          if(CSV)


      }

    render(){
        return(
            <div>
                <Modal isOpen = {this.props.isOpen} toggle = {() => this.props.toggleOpen()}>
                    <ModalBody>
                         <form onSubmit={this.handleSubmit}>
                             {this.state.categories.map(item => (
                                 <li>
                                     <label>
                                         <input type="checkbox" value={item.id} onChange={this.handleChange}/>
                                            {item.value}
                                     </label>
                                 </li>
                              ))}
                             <Button color="primary" style={{marginTop: 10, marginBottom: 10}} onClick={this.handleSubmit}>
                                Submit
                             </Button>
                              <Button color="primary" style={{marginTop: 10, marginBottom: 10, marginLeft: 10}} onClick={this.toggleOpen}>
                                 Close
                              </Button>
                         </form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}