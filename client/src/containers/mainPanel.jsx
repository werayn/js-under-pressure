import React from 'react';
import PropTypes from 'prop-types';
import {
    observer,
    inject,
} from 'mobx-react';
import { Welcome } from './welcome/index.jsx';
import { MainEditor } from './editor/index.jsx';
import { LogScreen } from './logger/log-screen.jsx';


@inject('store')
@observer
class MainPanel extends React.Component {

    static propTypes = {
        store: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="container-fluid">
                {
                    (this.props.store.start === 1) ?
                        <MainEditor /> :
                        <Welcome />
                }
                <LogScreen />
            </div>
        );
    }
}

export { MainPanel };
