import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'containers/app.jsx';
import { Api } from 'network/api.js';
import { AppStore } from 'mobx/index.js';

const api = new Api();
const store = new AppStore(api);
/**
 * DOM component - setup main component into root div
 * @reactProps {none} none - none
 * @desc Entry point of the react app
 * @extends {ReactDOM}
 * @public
 * @version 1.0
 * @since 1.0
 */
/*eslint react/jsx-filename-extension: 0*/
ReactDOM.render((
    <App store={ store } />
),
document.getElementById('root'));
