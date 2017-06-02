'use babel';

import React from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Modal from 'react-bootstrap-modal';
import LS from '../helper/LS.jsx';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            importConfig: {
                modal: false,
                tabs: null
            }
        };

        this.dataClear = this.dataClear.bind(this);
        this.modalImportOpen = this.modalImportOpen.bind(this);
        this.modalImportClose = this.modalImportClose.bind(this);
        this.modalImportChange = this.modalImportChange.bind(this);
        this.modalImportApply = this.modalImportApply.bind(this);
    }

    modalImportOpen() {
        const importConfig = this.state.importConfig;
        importConfig.modal = true;
        this.setState({importConfig: importConfig});
    }

    modalImportClose() {
        const importConfig = this.state.importConfig;
        importConfig.modal = false;
        this.setState({importConfig: importConfig});
    }

    modalImportChange(event) {
        const file = event.target.files[0];
        const path = file.path;
        const result = require(path);

        const importConfig = this.state.importConfig;
        importConfig.tabs = result;
        this.setState({importConfig: importConfig});

    }

    modalImportApply() {
        if (this.state.importConfig.tabs !== null) {
            LS.import(this.state.importConfig.tabs);
            this.setState({importConfig: {
                modal: false,
                tabs: null
            }});
        }
        this.props.onChange();
    }

    dataClear() {
        LS.clear();
        this.props.onChange();
    }

    dataExport() {
        LS.exportDatas();
    }

    render() {
        return (
            <header className="header application-header">
                <div className="left">
                    <div className="logo">
                        <div className="circles">
                            <div className="un"></div>
                            <div className="deux"></div>
                            <div className="trois"></div>
                            <span></span>
                        </div>
                    </div>
                    <h1>EaserBoard</h1>
                </div>
                <div className="right">
                    <div className="actions">
                        <ButtonToolbar>
                            <Dropdown id="config" pullRight>
                                <Dropdown.Toggle noCaret>
                                    <Glyphicon glyph="cog" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <MenuItem eventKey="1" onClick={this.modalImportOpen}>Importer une configuration</MenuItem>
                                    <MenuItem eventKey="2" onClick={this.dataExport}>Exporter la configuration</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey="3" onClick={this.dataClear}>Réinitialiser toute la configuration</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown id="user" pullRight>
                                <Dropdown.Toggle noCaret>
                                    <Glyphicon glyph="user" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <MenuItem eventKey="1">Action</MenuItem>
                                    <MenuItem eventKey="2">Another action</MenuItem>
                                    <MenuItem eventKey="3" active>Active Item</MenuItem>
                                    <MenuItem eventKey="4">Separated link</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonToolbar>
                    </div>
                </div>
                <Modal
                    show={this.state.importConfig.modal}
                    onHide={this.modalImportClose}
                    aria-labelledby="ModalHeader">
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Importer une config</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="importConfig">Fichier:</label>
                            <input type="file" className="form-control" id="importConfig" onChange={this.modalImportChange}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-primary' onClick={this.modalImportApply}>
                            Importer
                        </button>
                    </Modal.Footer>
                </Modal>
            </header>
        );
    }
}
