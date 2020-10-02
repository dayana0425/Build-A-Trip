import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { sendServerRequest, isJsonResponseValid } from "../../utils/restfulAPI";

import * as configSchema from "../../../schemas/ResponseConfig";

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
                    {this.renderSettings(this.getCurrentServerName(), this.getCurrentVersion(), this.getType(), this.getSupportedRequests())}
                    {this.renderActions()}
                </Modal>
            </div>
        );
    }

    renderSettings(currentServerName, currentVersion, currentType, currentSupportedRequests) {
        return (
            <ModalBody>
                <Row className="m-2">
                    <Col xs ={3}>
                        Name:
                    </Col>
                    <Col xs = {9}>
                        {currentServerName}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col xs={3}>
                        URL:
                    </Col>
                    <Col xs={9}>
                        {this.renderInputField()}
                    </Col>
                </Row>
                <Row className="m-2">
                     <Col xs={3}>
                         Type:
                     </Col>
                     <Col xs={9}>
                        {currentType}
                     </Col>
                </Row>
                <Row className="m-2">
                    <Col xs={3}>
                        Version:
                    </Col>
                    <Col xs={9}>
                        {currentVersion}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col xs={3}>
                        Supported Requests:
                    </Col>
                    <Col xs={9}>
                        [{currentSupportedRequests}]
                    </Col>
                </Row>
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

    getCurrentServerName() {
        let currentServerName = this.props.serverSettings.serverConfig && this.state.validServer === null ?
                                this.props.serverSettings.serverConfig.serverName : "";
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentServerName = this.state.config.serverName;
        }
        return currentServerName;
    }

    getCurrentVersion(){
        let currentVersion = this.props.serverSettings.serverConfig && this.state.validServer == null ? this.props.serverSettings.serverConfig.requestVersion : "";

        if(this.state.config && Object.keys(this.state.config).length > 0) {
            currentVersion = this.state.config.requestVersion;
        }
        return currentVersion;
    }

    getType(){
        let type = this.props.serverSettings.serverConfig && this.state.validServer == null ? this.props.serverSettings.serverConfig.requestType : "";
        if(this.state.config && Object.keys(this.state.config).length>0){
            type = this.state.config.requestType;
        }
        return type;
    }

    getSupportedRequests(){
        let sr = this.props.serverSettings.serverConfig && this.state.validServer == null ? this.props.serverSettings.serverConfig.supportedRequests : "";
        if(this.state.config && Object.keys(this.state.config).length>0){
            sr = this.state.config.supportedRequests;
        }
        return sr;
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
