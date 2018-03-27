'use babel';

import React from 'react';

export default class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    iterate(obj, stack) {
        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {

                if (typeof obj[property] === 'object') {
                    this.iterate(obj[property], stack + '.' + property);
                }
            }
        }
    }

    deepDisplay(items) {
        const newItems = [];
        for (const key in items) {
            newItems[newItems.length] = this.checker(items[key], key);
        }
        return newItems;
    }

    checker(entry, liKey) {
        switch (typeof entry) {
        case 'object':
            return (
                <li key={liKey}>
                    <span className="object">
                        {liKey}:
                    </span>
                    <ul key={liKey}>
                        {this.deepDisplay(entry)}
                    </ul>
                </li>
            );
        case 'list':
            return (
                <li key={liKey}>
                    <span className="list">
                        {liKey}:
                    </span>
                    <ul key={liKey}>
                        {this.deepDisplay(entry)}
                    </ul>
                </li>
            );
        case 'number':
            return (
                <li key={liKey}>
                    <span className="number">
                        {liKey}:
                    </span>
                    {entry}
                </li>
            );
        case 'string':
            return (
                <li key={liKey}>
                    <span className="string">
                        {liKey}:
                    </span>
                    {entry}
                </li>);
        default:
            return (
                <li key={liKey}>
                    <span className="unknow">
                        {liKey}:
                    </span>
                    {entry}
                </li>
            );
        }
    }

    render() {
        if (!this.props.error) {
            return (
                <div className="element layout-loader">
                    <div className="header">
                        {this.props.object.name}
                    </div>
                    <div className="body">
                        <span className="glyphicon glyphicon-repeat animate"></span>
                        <span className="loading">Loading</span>
                    </div>
                </div>
            );
        } else if (this.props.error.status === 404) {
            return (
                <div className="element layout-loader p404">
                    <div className="header">
                        {this.props.object.name}
                    </div>
                    <div className="body">
                        <div className="hit-the-floor">404</div>
                    </div>
                    {this.props.children}
                </div>
            );
        } else {
            const detailError = this.deepDisplay(this.props.error.error);
            return (
                <div className="element layout-loader">
                    <div className="header">
                        {this.props.object.name}
                    </div>
                    <div className="body">
                        <div>{this.props.error.message}</div>
                        <ul className="displayError">
                            {detailError}
                        </ul>
                    </div>
                    {this.props.children}
                </div>
            );
        }

    }
}

