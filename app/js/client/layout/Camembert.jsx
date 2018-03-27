'use babel';

import React from 'react';
import Colors from '../helper/Colors.jsx';
const AmCharts = require('@amcharts/amcharts3-react');

export default class Camembert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pie: null
        };
    }

    updateDatas() {
        this.setState({
            values: this.props.data.values
        });
        const values = [];
        Object.keys(this.props.data.values).forEach((key) => {
            values.push({
                status: key,
                number: this.props.data.values[key],
                color: Colors.get(key)
            });
        });

        this.setState({
            pie: {
                'type': 'pie',
                'theme': 'light',
                'dataProvider': values,
                'valueField': 'number',
                'titleField': 'status',
                'colorField': 'color',
                'balloon': {
                    'fixedPosition': true
                },
                'export': {
                    'enabled': false
                },
                'pullOutRadius': 0,
                'labelRadius': -22,
                'labelText': '[[percents]]%',
                'percentPrecision': 1,
                'outlineColor': ''
            }
        });
    }

    componentDidMount() {
        this.updateDatas();
    }

    componentDidUpdate() {
        if (this.props.data.values !== this.state.values) {
            this.updateDatas();
        }
    }

    render() {

        if (this.state.pie == null) {
            return (
                <div className={'element layout-camembert'}>
                    <div className='header'>
                        <span className='header-left'>{this.props.object.name}</span>
                    </div>

                    <div className='body'>
                        LOADING
                    </div>
                    <div className="element-actions">
                    <span className="update">
                        <i className='glyphicon glyphicon-refresh'></i>
                    </span>
                    <span className="config">
                        <i className='glyphicon glyphicon-cog'></i>
                    </span>
                    </div>
                </div>
            );
        }
        return (
            <div className={'element layout-camembert status__' + this.props.data.status}>
                <div className={'header status__' + this.props.data.status}>
                    <span className='header-left'>{this.props.object.name}</span>
                </div>
                {this.props.children}
            </div>
        );

    }
}
