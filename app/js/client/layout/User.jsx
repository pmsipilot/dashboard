'use babel';

import React from 'react';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: -1
        };
        this.getNextIndex = this.getNextIndex.bind(this);
        this.setNextIndex = this.setNextIndex.bind(this);
        this.resetIndex = this.resetIndex.bind(this);
    }

    componentDidMount() {
        let lastDate = null;
        let index = -1;
        /*
        if (Object.keys(lsDatas).length === 0) {
            this.setState({index: 0});
            lastDate = new Date();
            lastDate.setHours(0, 0 ,0 ,0);
            index = 0;
        } else {
            index = lsDatas.index;
            lastDate = new Date(lsDatas.date);
        }
        */


        const newIndex = this.addIndex(index, this.calcDays(lastDate));

        this.setState({index: newIndex});
    }

    componentWillUpdate() {
    }

    calcDays(lastDate) {
        const date = new Date();
        date.setHours(0, 0 ,0 ,0);

        const result = parseInt((date - lastDate) / (1000 * 60 * 60 * 24), 10);
        return result;
    }

    addIndex(index, toAdd) {
        const newIndex = (index + toAdd) % Object.keys(this.props.data).length;
        return newIndex;
    }

    getNextIndex() {
        const index = (this.state.index + 1) % Object.keys(this.props.data).length;
        return index;
    }

    setNextIndex() {
        const newIndex = this.getNextIndex();
        this.setState({index: newIndex});
    }

    resetIndex() {
        this.setState({index: 0});
    }

    render() {
        return (
            <div className='element layout-user'>
                <div className='header'>
                    <span className='header-left'>{ this.props.object.name }</span>
                    <span className='header-right'></span>
                </div>

                <div className='body'>
                    <div>
                        <span className='item'>
                            <i className='glyphicon glyphicon-user'></i>
                            { this.state.index < 0 ? 'Loading' : this.props.data[this.state.index].firstname + ' ' + this.props.data[this.state.index].lastname }
                        </span>
                        <span className='actions'>
                            <input className='btn btn-xs btn-success' type='button' value='Next' onClick={this.setNextIndex}/>
                            <input className='btn btn-xs btn-default' type='button' value='Reset'onClick={this.resetIndex}/>
                        </span>
                    </div>
                </div>
                {!this.props.object.small
                &&  <div className='footer'>
                        <span className='footer-left ng-binding'>
                            next : { this.state.index < 0 ? 'Loading' : this.props.data[this.getNextIndex()].firstname + ' ' + this.props.data[this.getNextIndex()].lastname }
                        </span>
                </div>
                }
                {this.props.children}
            </div>
        );
    }
}
