'use babel';

import React from 'react';
const Modal = require('react-bootstrap-modal');
import Elem from './Elem.jsx';
import LS from '../helper/LS.jsx';
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
            modal: false,
            id: this.props.id,
            newComponent: {
                label: '',
                slug: '',
                url: '',
                serializer: '',
                layout: '',
                checked: false
            },
            moving: false
        };
        this.childen = [];

        this.modalClose = this.modalClose.bind(this);
        this.modalSave = this.modalSave.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
        this.refreshAll = this.refreshAll.bind(this);
        this.closeAll = this.closeAll.bind(this);
        this.openAll = this.openAll.bind(this);
        this.newComponentLabel = this.newComponentLabel.bind(this);
        this.newComponentSlug = this.newComponentSlug.bind(this);
        this.newComponentURL = this.newComponentURL.bind(this);
        this.newComponentSerializer = this.newComponentSerializer.bind(this);
        this.newComponentLayout = this.newComponentLayout.bind(this);
        this.newComponentReinit = this.newComponentReinit.bind(this);
        this.newComponentCheck = this.newComponentCheck.bind(this);
        this.actionDeleteElement = this.actionDeleteElement.bind(this);
        this.actionChangeElement = this.actionChangeElement.bind(this);
        this.actionToggleSizeElement = this.actionToggleSizeElement.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onResizeStart = this.onResizeStart.bind(this);
        this.onResizeStop = this.onResizeStop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
    }

    componentDidMount() {
        const savedLayouts = LS.getLayouts(this.props.id);
        const objects = LS.getObjects(this.props.id);
        this.setState({
            savedLayouts: savedLayouts,
            objects: objects
        });
    }

    newComponentReinit() {
        this.setState({ newComponent: {
            label: '',
            slug: '',
            url: '',
            serializer: '',
            layout: '',
            checked: false
        }});
    }

    newComponentCheck() {
        let checked = true;

        if (this.state.newComponent.label.length <= 0) {
            checked = false;
        }

        if (this.state.newComponent.slug.length <= 0) {
            checked = false;
        }

        if (this.state.newComponent.url.length <= 0) {
            checked = false;
        }

        if (this.state.newComponent.layout.length <= 0) {
            checked = false;
        }

        if (this.state.newComponent.serializer.length <= 0) {
            checked = false;
        }

        // check if slug is unique

        if (this.state.objects[this.state.newComponent.slug] !== undefined) {
            checked = false;
        }


        const newComponent = this.state.newComponent;
        newComponent.checked = checked;
        this.setState({ newComponent: newComponent });
    }

    newComponentLabel(event) {
        const newComponent = this.state.newComponent;
        newComponent.label = event.target.value;
        newComponent.slug = Helper.slugify(event.target.value);
        this.setState({ newComponent: newComponent });
        this.newComponentCheck();
    }

    newComponentSlug(event) {
        const newComponent = this.state.newComponent;
        newComponent.slug = Helper.slugify(event.target.value);
        this.setState({ newComponent: newComponent });
        this.newComponentCheck();
    }

    newComponentURL(event) {
        const newComponent = this.state.newComponent;
        newComponent.url = event.target.value;
        this.setState({ newComponent: newComponent });
        this.newComponentCheck();
    }

    newComponentSerializer(event) {
        const newComponent = this.state.newComponent;
        newComponent.serializer = event.target.value;
        this.setState({ newComponent: newComponent });
        this.newComponentCheck();
    }

    newComponentLayout(event) {
        const newComponent = this.state.newComponent;
        newComponent.layout = event.target.value;
        this.setState({ newComponent: newComponent });
        this.newComponentCheck();
    }

    modalClose() {
        this.setState({ modal: false });
    }

    modalOpen() {
        this.setState({ modal: true });
    }

    modalSave() {
        const newObject = {
            name: this.state.newComponent.label,
            slug: this.state.newComponent.slug,
            url: this.state.newComponent.url,
            serializer: this.state.newComponent.serializer,
            layout: this.state.newComponent.layout
        };
        this.setState({
            objects: LS.addObject(this.props.id, newObject, this.state.newComponent.slug)
        });
        this.newComponentReinit();
        this.modalClose();
    }

    refreshAll() {
        Object.keys(this.childen).forEach((key) => {
            if (typeof this.childen[key].loadDatas === 'function') {
                this.childen[key].loadDatas();
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

    actionDeleteElement(key) {
        this.setState({
            objects: LS.delObject(this.props.id, key)
        });
    }

    actionChangeElement(object) {
        this.setState({
            objects: LS.changeObject(this.props.id, object, object.slug)
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

        this.setState({
            savedLayouts: LS.setLayouts(this.props.id, layoutsToSave)
        });
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
                        onRef={ref => (this.childen[obj.slug] = ref)}
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
                    <button onClick={this.modalOpen}>Creer un nouveau Element</button>
                    <button onClick={this.refreshAll}>Raffraichir</button>
                    <button onClick={this.openAll}>Déplier tout les éléments</button>
                    <button onClick={this.closeAll}>Plier tout les éléments</button>
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
                <Modal
                    show={this.state.modal}
                    onHide={this.modalClose}
                    aria-labelledby="ModalHeader">
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Creer un nouveau element</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="name">Nom:</label>
                            <input type="text" className="form-control" id="name" onChange={this.newComponentLabel} value={this.state.newComponent.label}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Slug:</label>
                            <input type="text" className="form-control" id="slug" onChange={this.newComponentSlug} value={this.state.newComponent.slug}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="url">URL sources:</label>
                            <input type="text" className="form-control" id="url" onChange={this.newComponentURL} value={this.state.newComponent.url}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="layout">Layout:</label>
                            <select className="form-control" id="layout" onChange={this.newComponentLayout} value={this.state.newComponent.layout}>
                                <option value="" key={0}>Choisir un layout</option>
                                {Object.keys(Layouts).map(layout =>
                                    <option value={layout} key={layout}>{layout}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="serializer">Serializer:</label>
                            <select className="form-control" id="serializer" onChange={this.newComponentSerializer} value={this.state.newComponent.serializer}>
                                <option value="" key={0}>Choisir un serializer</option>
                                {Object.keys(Serializers).map(serializer =>
                                    <option value={serializer} key={serializer}>{serializer}</option>
                                )}
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-primary' onClick={this.modalSave} disabled={!this.state.newComponent.checked}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
