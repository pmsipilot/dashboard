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
                <svg className="background__ground" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_2" x="0" y="0" viewBox="0 0 1314 227.7"><g id="ground"><path className="st0" d="M0 21.6c141-41.8 293.2-11.1 441.1-5.1 107.2 4.4 214.4-4.5 321.6-9.3C814.4 4.8 866.3 3.4 918 8c46.2 4.1 92 13.1 138.3 13.2 86.5 0.1 175.7-30.4 257.7-2.5v209H0V21.6z"/></g>

  </svg>
                <div className="snow">
                </div>
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


                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="snowman" x="0" y="0" viewBox="0 -20 300 250" enable-background="new 0 0 178 219.4">
    <ellipse id="shadow" transform="matrix(0.9976 -6.986409e-02 6.986409e-02 0.9976 -14.0967 6.4916)" className="st0" cx="85.8" cy="204.8" rx="68.9" ry="13.8"/>
  <g className="background__snowman">
    <g id="arm-r">
      <polyline className="st1" points="130 91.5 155.5 66.5 173.1 63.5 176.5 52.4 "/>
      <line className="st1" x1="155" y1="67" x2="155" y2="52"/>
      <line className="st1" x1="165.4" y1="64.8" x2="176.5" y2="77"/>
    </g>
    <ellipse id="body" transform="matrix(0.9955 -9.424890e-02 9.424890e-02 0.9955 -12.4309 9.7989)" className="st2" cx="97.5" cy="136.5" rx="65" ry="71.5"/>
    <circle id="head" className="st2" cx="86.5" cy="41" r="41"/>
    <g id="eyes">
      <ellipse transform="matrix(0.9437 -0.3309 0.3309 0.9437 -8.0174 28.9066)" className="st3" cx="80.9" cy="38" rx="4.9" ry="6.5"/>
      <ellipse transform="matrix(0.9437 -0.3309 0.3309 0.9437 -4.1167 39.8191)" className="st3" cx="114.9" cy="32" rx="4.9" ry="6.5"/>
    </g>
    <ellipse id="nose" transform="matrix(0.9598 -0.2807 0.2807 0.9598 -8.8038 31.2377)" className="st4" cx="104.7" cy="46.4" rx="7.1" ry="5.4"/>
    <ellipse id="mouth" className="st5" cx="101.1" cy="63.8" rx="3.6" ry="3.2"/>
    <g id="arm-l">
      <polyline className="st6" points="61 103.5 22 85.5 16.5 65.1 7.5 60.5 "/>
      <line className="st6" x1="19.7" y1="76.8" x2="0.5" y2="82"/>
      <line className="st6" x1="32.1" y1="90.2" x2="19.7" y2="96"/>
    </g>
    <g id="buttons">
      <ellipse transform="matrix(0.9821 0.1884 -0.1884 0.9821 20.1032 -18.9613)" className="st7" cx="109.8" cy="96.2" rx="5.1" ry="4.8"/>
      <ellipse transform="matrix(0.9378 -0.3472 0.3472 0.9378 -34.9546 47.3867)" className="st7" cx="114.8" cy="121.2" rx="5.1" ry="4.8"/>
    </g>
  </g>
  </svg>

            </div>
        );
    }
}
