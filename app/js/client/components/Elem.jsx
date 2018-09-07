'use babel';

import React from 'react';
import axios from 'axios';
import * as Layouts from '../layout/Layouts.jsx';
import * as Serializers from '../serializer/Serializer.jsx';
import ElemActions from './ElemActions.jsx';
import Loader from './Loader.jsx';

export default class Elem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            object: this.props.object,
            data: false,
            error: false,
            timeout: null
        };
        this.props.onRef(this);
        this.actionsCallback = this.actionsCallback.bind(this);
        this.actionDelete = this.actionDelete.bind(this);
        this.loadDatas = this.loadDatas.bind(this);
        this.actionToggleSize = this.actionToggleSize.bind(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    actionToggleSize() {
        this.props.onToggleSize();
    }

    loadDatas() {
        clearTimeout(this.state.timeout);
        this.setState({data: false});
        axios.get(this.props.object.url)
            .then(res => {
                this.setState({
                    data: Serializers[this.props.object.serializer].serialize(res.data),
                    error: false
                });
            })
            .catch((error) => {
                if (error.response) {
                    this.setState({error: {
                        error: error,
                        status: error.response.status,
                        message: 'The request was made and the server responded with a status code'
                    }});
                } else if (error.request) {
                    this.setState({error: {
                        error: error,
                        status: 404,
                        message: 'The request was made but no response was received'
                    }});
                } else {
                    this.setState({error: {
                        error: error,
                        status: -1,
                        message: error.message
                    }});
                }
            });
        this.setState({ timeout: setTimeout(this.loadDatas, 600000) });
    }

    componentDidMount() {
        this.loadDatas();
    }

    actionsCallback(object) {
        this.props.onChange(object);
    }

    actionDelete() {
        this.props.onDelete();
    }

    render() {

        const elemAction = (
            <ElemActions
                see_url={this.state.data.url}
                object={this.props.object}
                onChange={this.actionsCallback}
                onDelete={this.actionDelete}
                onToggleSize={this.actionToggleSize}
                onUpdate={this.loadDatas}
            />
        );

        if (!this.state.data || !!this.state.error) {
            return (
                <Loader
                    object={this.props.object}
                    error={this.state.error}>
                    {elemAction}
                </Loader>
            );
        }

        const Layout = Layouts[this.props.object.layout];
        return (
            <Layout
                data={this.state.data}
                object={this.props.object}>
                {elemAction}
            </Layout>
        );
    }
}
