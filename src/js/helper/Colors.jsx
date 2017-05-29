/* eslint camelcase: ["error", {properties: "never"}] */
export default class Colors {
    static get(value) {
        const colors = {
            success: '#5cb85c',
            success__pending: '#5cb85c',
            warning: '#f0ad4e',
            warning__pending: '#f0ad4e',
            failed: '#d9534f',
            failed__pending: '#d9534f',
            disabled: '#777',
            aborted: '#777',
            disabled__pending: '#777',
            aborted__pending: '#777'
        };

        return colors[value];
    }
}
