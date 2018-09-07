'use babel';

import React from 'react';
import * as Layouts from '../layout/Layouts.jsx';
import * as Serializers from '../serializer/Serializer.jsx';

export default class Elem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            object: this.props.object,
            modal: false
        };
    }

    callback() {
        this.props.onChange(this.state.object);
    }

    render() {
        return (
            <div className="element-actions">
                <div className="actions-left">
                    <span className="action update" onClick={this.props.onUpdate}>
                        <i className='glyphicon glyphicon-refresh'></i>
                    </span>
                </div>
                <div className="actions-right">
                     <a className="action see" href={this.props.see_url} target='_blank'>
                         <i className='glyphicon glyphicon-eye-open'></i>
                     </a>
                    {this.props.object.cantoggle
                    &&  <span className="action toggle-size" onClick={this.props.onToggleSize}>
                            <i className={'glyphicon glyphicon-chevron-' + (this.props.object.small ? 'down' : 'up')}></i>
                        </span>
                    }
                </div>
            </div>
        );
    }
}
