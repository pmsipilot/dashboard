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
        const objects = this.state.objects;
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
        const objects = this.state.objects;
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
        const objects = this.state.objects;
        objects[key].small = !objects[key].small;
        this.setState({
            objects: objects
        });
    }

    getDisplayedLayout() {
        const layoutsDisplay = this.state.savedLayouts;
        if (this.state.savedLayouts.lg === undefined) {
            return this.state.savedLayouts;
        }
        const newLayouts = {};
        newLayouts.lg = layoutsDisplay.lg.map(layout => {
            const newLayout = {};
            Object.assign(newLayout, layout);
            const slug = newLayout.i;
            if (this.state.objects[slug] !== undefined && this.state.objects[slug].cantoggle
                && this.state.objects[slug].small) {
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
                if (this.state.savedLayouts.lg !== undefined && this.state.savedLayouts.lg[index] !== undefined) {
                    const oldlayout = this.state.savedLayouts.lg[index];
                    if (oldlayout.i === newLayout.i && newLayout.h === 1) {
                        newLayout.h = oldlayout.h;
                    }
                }
                return newLayout;
            });
        }
        /*
        this.setState({
            savedLayouts: LS.setLayouts(this.props.id, layoutsToSave)
        });
        */
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
        if (this.state.savedLayouts === null || this.state.objects === null) {
            return (
                <div className="loading">
                    Loading...
                </div>
            );
        }

        const objects = Object.keys(this.state.objects).map((index) => {
            const obj = this.state.objects[index];
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
                    <button onClick={this.refreshAll}>Rafraîchir</button>
                    <button onClick={this.openAll}>Déplier tous les éléments</button>
                    <button onClick={this.closeAll}>Plier tous les éléments</button>
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
