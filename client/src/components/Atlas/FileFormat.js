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
            checkedItems: new Map()
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(event) {
            var isChecked = event.target.checked;
            var item = event.target.value;

            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
      }

      handleSubmit(event) {
        console.log(this.state);
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