'use babel';

import React from 'react';

export default class Traditionnel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='element layout-traditionnel'>
                <div className='trafficlight'>
                    <div className={'status status__' + this.props.data.status}>
                        <div className={'light ' + this.props.data.status}></div>
                        <div className='content'>
                            <div className='title'>
                                <a target='_blank' href='{this.props.data.url}'>
                                    {this.props.object.name}
                                </a>
                            </div>
                        </div>
                        <div className='children'>
                            {this.props.data.child.map(job =>
                                <div className={'child status__' + job.color} key={job.name}>
                                    <div className='name'>
                                        {job.name}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

