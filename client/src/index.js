import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { App } from 'containers/app.jsx';
import { Api } from 'network/api.js';
import { AppStore } from 'store/index.js';
import { sandBox } from './sandbox/index.js';

const api = new Api();
const sand = new sandBox();
const store = new AppStore(api, sand);
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
    <Provider store={ store }>
        <App />
    </Provider>
),
document.getElementById('root'));
