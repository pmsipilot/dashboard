'use babel';

import React from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Modal from 'react-bootstrap-modal';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
        };

        this.dataClear = this.dataClear.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = (re) => {
            this.setState({modal: false});
            this.props.onChange(re.target.result);
        };
        reader.readAsBinaryString(this.fileInput.current.files[0]);
    }

    dataClear() {
        this.props.onChange('{"main": {"label": "Main", "objects": {}, "layouts": {}}}');
    }

    closeModal(e) {
        e.preventDefault();
        this.setState({modal: false});
    }

    render() {
        return (
            <header className="header application-header">
                <div className="left">
                    <div className="logo">
                        <div className="circles">
                            <div className="red"></div>
                            <div className="yellow"></div>
                            <div className="green"></div>
                            <span></span>
                        </div>
                    </div>
                    <h1>DashBoard</h1>
                </div>
                <div className="right">
                    <div className="actions">
                        <ButtonToolbar>
                            <Dropdown id="config" pullRight>
                                <Dropdown.Toggle noCaret>
                                    <Glyphicon glyph="cog"/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <MenuItem eventKey="1" onClick={() => this.setState({modal: true})}>Import a configuration file</MenuItem>
                                    <MenuItem divider/>
                                    <MenuItem eventKey="3" onClick={this.dataClear}>Clear the configuration</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonToolbar>
                    </div>
                </div>
                <Modal
                    show={this.state.modal}
                    onHide={(e) => this.closeModal(e)}
                    aria-labelledby="ModalHeader">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title id='ModalHeader'>Import a configuration file</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="importConfig">File:</label>
                                    <input type="file" className="form-control" id="importConfig" ref={this.fileInput}/>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-link" onClick={(e) => this.closeModal(e)}>Cancel</button>
                            <button className='btn btn-primary' type="submit">
                                Import
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </header>
        );
    }
}
