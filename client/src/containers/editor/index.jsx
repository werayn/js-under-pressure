import React from 'react';
import PropTypes from 'prop-types';
import {
    observer,
    inject,
} from 'mobx-react';
import { Editor } from './components/aceEditor.jsx';
import { Timer } from './components/timer.jsx';


@inject('store')
@observer
class MainEditor extends React.Component {

    static propTypes = {
        store: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="row">
                <Editor />
                <div className="col-md-2 ">
                    <Timer start={ Date.now() } />
                </div>
            </div>
        );
    }
}

export { MainEditor };
