/* global localStorage */
/* global URL */
/* global Blob */
/* global document */
/* global window */

export default class LS {
    static save(key, value) {
        if (localStorage) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    static get(key) {
        let ls = {};
        if (localStorage) {
            try {
                ls = JSON.parse(localStorage.getItem(key)) || {};
            } catch (e) {
                /* Ignore */
            }
        }
        return ls;
    }

    static saveTab(key, value) {
        let tabs = {};
        if (localStorage) {
            tabs = JSON.parse(localStorage.getItem('tabs')) || {};
            tabs[key] = value;
            localStorage.setItem('tabs', JSON.stringify(tabs));
        }
        return tabs;
    }

    static import(tabs) {
        if (localStorage) {
            localStorage.setItem('tabs', JSON.stringify(tabs));
        }
    }

    static getTabs() {
        let tabs = {};
        if (localStorage) {
            tabs = JSON.parse(localStorage.getItem('tabs')) || {};
        }
        return tabs;
    }

    static delTab(key) {
        let tabs = {};
        if (localStorage) {
            tabs = JSON.parse(localStorage.getItem('tabs')) || {};
            delete tabs[key];
            localStorage.setItem('tabs', JSON.stringify(tabs));
        }
        return tabs;
    }

    static getTab(key) {
        let tab = {};
        if (localStorage) {
            const tabs = JSON.parse(localStorage.getItem('tabs')) || {};
            if (tabs[key] !== undefined) {
                tab = tabs[key];
            }
        }
        return tab;
    }

    static getLayouts(key) {
        let layouts = {};
        if (localStorage) {
            const tabs = JSON.parse(localStorage.getItem('tabs')) || {};
            if (tabs[key] !== undefined) {
                layouts = tabs[key].layouts;
            }
        }
        return layouts;
    }

    static setLayouts(key, layouts) {
        if (localStorage) {
            const tabs = JSON.parse(localStorage.getItem('tabs')) || {};
            tabs[key].layouts = layouts;
            localStorage.setItem('tabs', JSON.stringify(tabs));
        }
        return layouts;
    }

    static getObjects(key) {
        let objects = [];
        if (localStorage) {
            const tabs = JSON.parse(localStorage.getItem('tabs')) || {};
            if (tabs[key] !== undefined) {
                objects = tabs[key].objects;
            }
        }
        return objects;
    }

    static addObject(key, object, slug) {
        let objects = {};
        if (localStorage) {
            const tabs = JSON.parse(localStorage.getItem('tabs')) || {};
            tabs[key].objects[slug] = object;
            objects = tabs[key].objects;
            localStorage.setItem('tabs', JSON.stringify(tabs));
        }
        return objects;
    }

    static delObject(key, objectSlug) {
        let objects = [];
        if (localStorage) {
            const tabs = JSON.parse(localStorage.getItem('tabs')) || {};
            delete tabs[key].objects[objectSlug];

            objects = tabs[key].objects;
            localStorage.setItem('tabs', JSON.stringify(tabs));
        }
        return objects;
    }

    static changeObject(key, object, objectSlug) {
        let objects = [];
        if (localStorage) {
            const tabs = JSON.parse(localStorage.getItem('tabs')) || {};
            if (tabs[key].objects[objectSlug] !== undefined) {
                tabs[key].objects[objectSlug] = object;
                objects = tabs[key].objects;
                localStorage.setItem('tabs', JSON.stringify(tabs));
            } else {
                return tabs[key].objects;
            }

        }
        return objects;
    }

    static exportDatas() {
        const tabs = this.getTabs();
        const json = JSON.stringify(tabs);
        const data = new Blob([json], {type: 'text/csv'});
        const jsonURL = window.URL.createObjectURL(data);
        const tempLink = document.createElement('a');
        tempLink.href = jsonURL;
        tempLink.setAttribute('download', 'save.json');
        tempLink.click();
    }

    static clear() {
        localStorage.clear();
    }
}
