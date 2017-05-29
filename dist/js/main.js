import React from 'react';
import ReactDOM from 'react-dom';
import Application from '../../src/js/components/Application.jsx';
import $ from '../../src/js/libs/jquery';
const shell = require('electron').shell;


$( document ).ready(() => {
  ReactDOM.render(<Application />, document.getElementById('app'));

  $(document).on('click', 'a', function(event) {
    if (this.href !== null && this.href !== '#' && this.href.substr(this.href.length - 1) !== '#') {
      event.preventDefault();
      shell.openExternal(this.href);
    }
  });
});
