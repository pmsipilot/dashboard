'use babel';

import React from 'react';
import Header from './Header.jsx';
import BoardTabs from './BoardTabs.jsx';
import axios from 'axios';

export default class Application extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        this.loadData();
    }

    save(data) {
        axios.post('/api/elems', {data}).then(() => {
            this.loadData();
        });
    }

    loadData() {
        axios.get('/api/elems').then((response) => {
            this.setState({data: response.data});
        });
    }

    render() {
        return (
        <div className="app">
            <Header onChange={(data) => this.save(data)}/>
            <BoardTabs data={this.state.data}/>
        </div>
        );
    }
}
