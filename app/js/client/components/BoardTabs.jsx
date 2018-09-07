'use babel';

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Panel from './Panel.jsx';

export default class BoardTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
        };
    }

    render() {
        if (this.props.data == null) {
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
                            Object.keys(this.props.data).map((tab, i) => (
                                    <Tab key={i}>
                                        {this.props.data[tab].label}
                                    </Tab>
                                )
                            )
                        }
                    </TabList>
                    {
                        Object.keys(this.props.data).map((tab, i) => (
                                <TabPanel key={i}>
                                    <Panel id={tab} infos={ this.props.data[tab] } objects={this.props.data[tab].objects} layouts={this.props.data[tab].layouts}/>
                                </TabPanel>
                            )
                        )
                    }
                </Tabs>
            </div>
        );
    }
}
