'use babel';

import React from 'react';
import Header from './Header.jsx';
import BoardTabs from './BoardTabs.jsx';

export default class Application extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyBoard: Math.random()
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
    }

    onChange() {
        this.setState({keyBoard: Math.random()});
    }

    render() {
        return (
        <div className="app">
            <Header onChange={this.onChange}/>
            <BoardTabs key={this.state.keyBoard}/>
        </div>
        );
    }
}
