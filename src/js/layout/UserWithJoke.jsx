'use babel';

import React from 'react';
import axios from 'axios';
import LS from '../helper/LS.jsx';

export default class UserWithJoke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            joke: null
        };
        this.getNextIndex = this.getNextIndex.bind(this);
        this.setNextIndex = this.setNextIndex.bind(this);
        this.resetIndex = this.resetIndex.bind(this);
        this.LSsave = this.LSsave.bind(this);
        this.getJoke = this.getJoke.bind(this);
    }

    componentDidMount() {
        const lsDatas = LS.get('calendar_' + this.props.object.slug);
        let lastDate = null;
        let index = -1;
        if (Object.keys(lsDatas).length === 0) {
            this.setState({index: 0});
            lastDate = new Date();
            lastDate.setHours(0, 0 ,0 ,0);
            index = 0;
        } else {
            index = lsDatas.index;
            lastDate = new Date(lsDatas.date);
        }


        const newIndex = this.addIndex(index, this.calcDays(lastDate));

        this.setState({index: newIndex});
        this.LSsave(newIndex);
        this.getJoke(newIndex);
    }

    getJoke(newIndex) {
        axios.get(`http://api.icndb.com/jokes/random?firstName=${this.props.data[newIndex].firstname}&lastName=${this.props.data[newIndex].lastname}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    joke: res.data.value.joke
                });
            })
            .catch((error) => {
                this.setState({
                    joke: 'No joke today'
                });
            });
    }

    LSsave(index) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        LS.save('calendar_' + this.props.object.slug, {
            date: today,
            index: index
        });
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
        this.LSsave(newIndex);
    }

    resetIndex() {
        this.setState({index: 0});
        this.LSsave(0);
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
                    <div className="joke">
                        <blockquote>{ this.state.joke === null ? 'Loading joke...' : this.state.joke }</blockquote>
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
