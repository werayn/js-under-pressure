import React from 'react';
import PropTypes from 'prop-types';
import {
    observer,
    inject,
} from 'mobx-react';
import { Welcome } from './welcome/index.jsx';
import { Editor } from './editor/index.jsx';


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
        console.log('main:', this.props.store.level);
        return (
            (this.props.store.start === 1) ?
                <Editor level={ this.props.store.levels[this.props.store.level] } /> :
                <Welcome />
        );
    }
}

export { MainEditor };
