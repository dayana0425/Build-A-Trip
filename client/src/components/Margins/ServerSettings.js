import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { sendServerRequest, isJsonResponseValid } from "../../utils/restfulAPI";
import * as configSchema from "../../../schemas/ResponseConfig";
import {tableFormat} from './Template.js'

export default class ServerSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: null,
            config: {}
        };
        this.saveInputText = this.state.inputText;

    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                    <ModalHeader toggle={() => this.props.toggleOpen()}>Server Connection</ModalHeader>
                    {this.renderSettings(
                     this.getProperties("serverName"),
                     this.getProperties("serverVersion"),
                     this.getProperties("requestType"),
                     this.getProperties("supportedRequests"))}
                    {this.renderActions()}
                </Modal>
            </div>
        );
    }

    renderSettings(currentServerName, currentVersion, currentType, currentSupportedRequests) {
        return (
            <ModalBody>
               { tableFormat("Name",currentServerName)}
               { tableFormat("URL",this.renderInputField())}
               { tableFormat("Type", currentType)}
               { tableFormat("Version", currentVersion)}
               { tableFormat("Supported Requests", currentSupportedRequests)}
            </ModalBody>
        );
    }

    renderInputField() {
        let valid = this.state.validServer === null ? false : this.state.validServer;
        let notValid = this.state.validServer === null ? false : !this.state.validServer;
        return(
            <Input onChange={(e) => this.updateInput(e.target.value)}
                   value={this.state.inputText}
                   placeholder={this.props.serverPort}
                   valid={valid}
                   invalid={notValid}
            />
        );
    }

    renderActions() {
        return (
            <ModalFooter>
                <Button color="primary" onClick={() => this.resetServerSettingsState()}>Cancel</Button>
                <Button color="primary" onClick={() =>
                {
                    this.props.processServerConfigSuccess(this.state.config, this.state.inputText);
                    this.resetServerSettingsState(this.state.inputText);
                }}
                        disabled={!this.state.validServer}
                >
                    Save
                </Button>
            </ModalFooter>
        );
    }

    getProperties(type){
        let value = this.props.serverSettings.serverConfig && this.state.validServer=== null ?
                                                    this.props.serverSettings.serverConfig[type]: "";
        if(this.state.config && Object.keys(this.state.config).length > 0) {
                    value = his.state.config[type];
                }

         return value;
    }


    updateInput(value) {
        this.setState({inputText: value}, () => {
            if (this.shouldAttemptConfigRequest(value)) {
                sendServerRequest({requestType: "config", requestVersion: 1, supportedRequests: []}, value)
                    .then(config => {
                        if (config) { this.processConfigResponse(config.data) }
                        else { this.setState({validServer: true, config: config}); }
                    });
            } else {
                this.setState({validServer: false, config: {}});
            }
        });
    }

    shouldAttemptConfigRequest(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null && resource.length > 15;
    }

    processConfigResponse(config) {
        if(!isJsonResponseValid(config, configSchema)) {
            this.setState({validServer: false, config: false});
        } else {
            this.setState({validServer: true, config: config});
        }
    }

    resetServerSettingsState(inputText=this.saveInputText) {
        this.props.toggleOpen();
        this.setState({
            inputText: inputText,
            validServer: null,
            config: false
        });
    }
}
