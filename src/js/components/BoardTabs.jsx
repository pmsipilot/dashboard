'use babel';

import React from 'react';
import Modal from 'react-bootstrap-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Panel from './Panel.jsx';
import LS from '../helper/LS.jsx';
import Helper from '../helper/Helper.jsx';

export default class BoardTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: null,
            modal: false,
            selectedIndex: -1,
            form: {
                label: '',
                slug: '',
                checked: false
            }
        };
        this.modalOpen = this.modalOpen.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.modalSave = this.modalSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.slugChange = this.slugChange.bind(this);
        this.removeTab = this.removeTab.bind(this);
        this.modalCheck = this.modalCheck.bind(this);
    }

    componentDidMount() {
        this.setState({
            tabs: LS.getTabs()
        });
    }

    modalOpen() {
        this.setState({modal: true});
    }

    modalCheck() {
        let checked = true;

        if (this.state.form.label.length <= 0) {
            checked = false;
        }

        if (this.state.form.slug.length <= 0) {
            checked = false;
        }

        if (Object.keys(LS.getTab(this.state.form.slug)).length > 0) {
            checked = false;
        }

        const form = this.state.form;
        form.checked = checked;
        this.setState({form: form});
    }

    inputChange(event) {
        const form = this.state.form;
        form.label = event.target.value;
        form.slug = Helper.slugify(event.target.value);
        this.setState({form: form});
        this.modalCheck();
    }

    slugChange(event) {
        const form = this.state.form;
        form.slug = Helper.slugify(event.target.value);
        this.setState({form: form});
        this.modalCheck();
    }

    modalClose() {
        this.setState({ modal: false });
    }

    modalSave() {
        const tabs = LS.saveTab(this.state.form.slug, {
            label: this.state.form.label,
            layouts: {},
            objects: []
        });
        this.setState({
            tabs: tabs,
            inputCreate: '',
            inputSlug: ''
        });
        this.modalClose();
    }

    removeTab(index) {
        const tabs = LS.delTab(index);
        this.setState({
            tabs: tabs,
            selectedIndex: Math.max(this.state.selectedIndex - 1, 0)
        });
    }

    render() {
        if (this.state.tabs == null) {
            return (
                <div>LOADING</div>
            );
        }

        return (
            <div className="boardTab">
                <div className="addTab" onClick={this.modalOpen}>
                    <i className="glyphicon glyphicon-plus"></i>
                </div>
                <Tabs
                    selectedIndex={this.state.selectedIndex}
                    onSelect={selectedIndex => this.setState({ selectedIndex })}>
                    <TabList>
                        {Object.keys(this.state.tabs).map((tab, i) => (
                            <Tab key={i}>
                                {this.state.tabs[tab].label}
                                <i className="glyphicon glyphicon-trash" onClick={() => this.removeTab(tab)}></i>
                            </Tab>
                        ))}
                    </TabList>
                    {Object.keys(this.state.tabs).map((tab, i) => <TabPanel key={i}>
                        <Panel id={tab}/>
                    </TabPanel>)}
                </Tabs>
                <Modal
                    show={this.state.modal}
                    onHide={this.modalClose}
                    aria-labelledby="ModalHeader">
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Creer un nouvel onglet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="inputCreate">Nom:</label>
                            <input type="text" className="form-control" id="inputCreate" onChange={this.inputChange} value={this.state.form.label}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="slug">Slug:</label>
                            <input type="text" className="form-control" id="slug" onChange={this.slugChange} value={this.state.form.slug}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-primary' onClick={this.modalSave} disabled={!this.state.form.checked}>
                            Creer
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
