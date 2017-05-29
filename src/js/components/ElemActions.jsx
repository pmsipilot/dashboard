'use babel';

import React from 'react';
const Modal = require('react-bootstrap-modal');
import * as Layouts from '../layout/Layouts.jsx';
import * as Serializers from '../serializer/Serializer.jsx';

export default class Elem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            object: this.props.object,
            modal: false
        };
        // This binding is necessary to make `this` work in the callback
        this.modalClose = this.modalClose.bind(this);
        this.modalSave = this.modalSave.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
        this.modalDelete = this.modalDelete.bind(this);
        this.modalFormName = this.modalFormName.bind(this);
        this.modalFormURL = this.modalFormURL.bind(this);
        this.modalFormLayout = this.modalFormLayout.bind(this);
        this.modalFormToggle = this.modalFormToggle.bind(this);
        this.modalFormTime = this.modalFormTime.bind(this);
        this.modalFormSerializer = this.modalFormSerializer.bind(this);
    }

    modalClose() {
        this.setState({ modal: false });
    }

    modalOpen() {
        this.setState({ modal: true });
    }

    modalDelete() {
        this.modalClose();
        this.props.onDelete();
    }

    modalFormName(event) {
        const object = this.state.object;
        object.name =  event.target.value;
        this.setState({object: object});
    }

    modalFormURL(event) {
        const object = this.state.object;
        object.url =  event.target.value;
        this.setState({object: object});
    }

    modalFormToggle() {
        const object = this.state.object;
        object.cantoggle =  !object.cantoggle;
        if (!object.cantoggle) {
            object.small = false;
        }
        this.setState({object: object});
    }

    modalFormTime(event) {
        const object = this.state.object;
        object.url =  event.target.value;
        this.setState({object: object});
    }

    modalFormLayout(event) {
        const object = this.state.object;
        object.layout =  event.target.value;
        this.setState({object: object});
    }

    modalFormSerializer(event) {
        const object = this.state.object;
        object.serializer =  event.target.value;
        this.setState({object: object});
    }

    modalSave() {
        this.modalClose();
        this.callback();
    }

    callback() {
        this.props.onChange(this.state.object);
    }

    render() {
        return (
            <div className="element-actions">
                <div className="actions-left">
                    <span className="action update" onClick={this.props.onUpdate}>
                        <i className='glyphicon glyphicon-refresh'></i>
                    </span>
                </div>
                <div className="actions-right">
                     <a className="action see" href={this.props.see_url}>
                         <i className='glyphicon glyphicon-eye-open'></i>
                     </a>
                    {this.props.object.cantoggle
                    &&  <span className="action toggle-size" onClick={this.props.onToggleSize}>
                            <i className={'glyphicon glyphicon-chevron-' + (this.props.object.small ? 'down' : 'up')}></i>
                        </span>
                    }
                    <span className="action config" onClick={this.modalOpen}>
                        <i className='glyphicon glyphicon-cog'></i>
                    </span>
                </div>
                <Modal
                    show={this.state.modal}
                    onHide={this.modalClose}
                    aria-labelledby="ModalHeader">
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>{this.props.object.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="name">Nom:</label>
                            <input type="text" className="form-control" id="name" onChange={this.modalFormName} value={this.props.object.name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Slug:</label>
                            <input type="text" className="form-control" id="slug" disabled value={this.props.object.slug}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="url">URL sources:</label>
                            <input type="text" className="form-control" id="url" onChange={this.modalFormURL} value={this.props.object.url}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="layout">Layout:</label>
                            <select className="form-control" id="layout" onChange={this.modalFormLayout} value={this.props.object.layout}>
                                {Object.keys(Layouts).map(layout =>
                                    <option value={layout} key={layout}>{layout}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="serializer">Serializer:</label>
                            <select className="form-control" id="serializer" onChange={this.modalFormSerializer} value={this.props.object.serializer}>
                                {Object.keys(Serializers).map(serializer =>
                                    <option value={serializer} key={serializer}>{serializer}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="checkbox-inline" htmlFor="toggle">
                                <input type="checkbox" className="form-control" id="toggle" onChange={this.modalFormToggle} checked={this.props.object.cantoggle}/>
                                Can be toggled
                            </label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-danger' onClick={this.modalDelete}>
                            Delete Element
                        </button>
                        <button className='btn btn-primary' onClick={this.modalSave}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
