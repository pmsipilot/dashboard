'use babel';

import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Panel from './Panel.jsx';
import Helper from '../helper/Helper.jsx';

export default class BoardTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: null,
            modal: false,
            selectedIndex: 0,
            infos: null,
            form: {
                label: '',
                slug: '',
                checked: false
            }
        };
    }

    componentDidMount() {
        this.updateInfos();
    }

    updateInfos() {
        axios.get('/api/elems/get').then((response) => {
            this.setState({
                tabs: response.data,
            });
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
                <Tabs
                    selectedIndex={this.state.selectedIndex}
                    onSelect={selectedIndex => this.setState({ selectedIndex })}>
                    <TabList>
                        {
                            Object.keys(this.state.tabs).map((tab, i) => (
                                    <Tab key={i}>
                                        {this.state.tabs[tab].label}
                                    </Tab>
                                )
                            )
                        }
                    </TabList>
                    {
                        Object.keys(this.state.tabs).map((tab, i) => (
                                <TabPanel key={i}>
                                    <Panel id={tab} infos={ this.state.tabs[tab] }/>
                                </TabPanel>
                            )
                        )
                    }
                </Tabs>
            </div>
        );
    }
}