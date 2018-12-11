'use babel';

import React from 'react';
import Elem from './Elem.jsx';
import * as Layouts from '../layout/Layouts.jsx';
import * as Serializers from '../serializer/Serializer.jsx';
import Helper from '../helper/Helper.jsx';
const WidthProvider = require('react-grid-layout').WidthProvider;
let ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedLayouts: null,
            objects: null,
            id: this.props.id,
            moving: false
        };
        this.children = [];

        this.refreshAll = this.refreshAll.bind(this);
        this.closeAll = this.closeAll.bind(this);
        this.openAll = this.openAll.bind(this);
        this.actionToggleSizeElement = this.actionToggleSizeElement.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onResizeStart = this.onResizeStart.bind(this);
        this.onResizeStop = this.onResizeStop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
    }

    componentDidMount() {
        this.setState({
            savedLayouts: this.props.infos.layouts,
            objects: this.props.infos.objects
        });
    }

    refreshAll() {
        Object.keys(this.children).forEach((key) => {
            if (typeof this.children[key].loadDatas === 'function') {
                this.children[key].loadDatas();
            }
        });
    }

    openAll() {
        const objects = this.props.objects;
        Object.keys(objects).forEach((key) => {
            if (objects[key].cantoggle) {
                objects[key].small = false;
            }
        });
        this.setState({
            objects: objects
        });
    }

    closeAll() {
        const objects = this.props.objects;
        Object.keys(objects).forEach((key) => {
            if (objects[key].cantoggle) {
                objects[key].small = true;
            }
        });
        this.setState({
            objects: objects
        });
    }

    actionToggleSizeElement(key) {
        const objects = this.props.objects;
        objects[key].small = !objects[key].small;
        this.setState({
            objects: objects
        });
    }

    getDisplayedLayout() {
        const layoutsDisplay = this.props.layouts;
        if (this.props.layouts.lg === undefined) {
            return this.props.layouts;
        }
        const newLayouts = {};
        newLayouts.lg = layoutsDisplay.lg.map(layout => {
            const newLayout = {};
            Object.assign(newLayout, layout);
            const slug = newLayout.i;
            if (this.props.objects[slug] !== undefined && this.props.objects[slug].cantoggle
                && this.props.objects[slug].small) {
                newLayout.h = 1;
            }
            return newLayout;
        });
        return newLayouts;
    }

    onLayoutChange(layout, layouts) {
        const newLayouts = layouts;
        const layoutsToSave = {};
        if (newLayouts.lg !== undefined) {
            layoutsToSave.lg = newLayouts.lg.map((l, index) => {
                const newLayout = l;
                if (this.props.layouts.lg !== undefined && this.props.layouts.lg[index] !== undefined) {
                    const oldlayout = this.props.layouts.lg[index];
                    if (oldlayout.i === newLayout.i && newLayout.h === 1) {
                        newLayout.h = oldlayout.h;
                    }
                }
                return newLayout;
            });
        }
    }

    onDragStart() {
        this.setState({moving: true});
    }

    onDragStop() {
        this.setState({moving: false});
    }

    onResizeStart() {
        this.setState({moving: true});
    }

    onResizeStop() {
        this.setState({moving: false});
    }

    render() {
        if (this.props.layouts === null || this.props.objects === null) {
            return (
                <div className="loading">
                    Loading...
                </div>
            );
        }

        const objects = Object.keys(this.props.objects).map((index) => {
            const obj = this.props.objects[index];
            if (obj.small === undefined) {
                obj.small = obj.cantoggle;
            }
            let className = obj.small ? 'container_small' : 'container_big';
            if (this.state.moving) {
                className += ' moving';
            }
            return (
                <div
                    key={obj.slug}
                    className={className}>
                    <Elem
                        object={obj}
                        onDelete={() => this.actionDeleteElement(obj.slug)}
                        onChange={this.actionChangeElement}
                        onRef={ref => (this.children[obj.slug] = ref)}
                        onToggleSize={() => this.actionToggleSizeElement(obj.slug)}
                    />
                    <span className="react-draggable-handle">
                        <span className="glyphicon glyphicon-move"></span>
                    </span>
                </div>
            );
        });
        const displayedLayout = this.getDisplayedLayout();
        return (
            <div className="tabPanel">
                <div className="tabActions">
                    <button onClick={this.refreshAll}>Refresh</button>
                    <button onClick={this.openAll}>Unwrap all</button>
                    <button onClick={this.closeAll}>Wrap all</button>
                </div>
                <ResponsiveReactGridLayout
                    ref={this.props.id}
                    {...this.props}
                    layouts={displayedLayout}
                    breakpoints={{lg: 1200}}
                    cols={{lg: 12}}
                    rowHeight={25}
                    verticalCompact={true}
                    draggableHandle='.react-draggable-handle'
                    draggableCancel='.element'
                    onLayoutChange={this.onLayoutChange}
                    onDragStart={this.onDragStart}
                    onDragStop={this.onDragStop}
                    onResizeStart={this.onResizeStart}
                    onResizeStop={this.onResizeStop}
                    >
                    {objects}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}
