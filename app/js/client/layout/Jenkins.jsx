'use babel';

import React from 'react';

export default class Jenkins extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'element layout-jenkins status__' + this.props.data.status}>
                <div className={'header status__' + this.props.data.status}>
                    {this.props.object.name}
                </div>
                <div className="body">
                    <div className='children'>
                        {this.props.data.child.map(job =>
                            <div className={'child status__' + job.color} key={job.name}>
                                <div className='name'>
                                    {job.name}
                                </div>
                                <span className="view">
                                    <a href={job.url} target="_blank"><i className='glyphicon glyphicon-eye-open'></i></a>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

