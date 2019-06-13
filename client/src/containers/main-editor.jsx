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
        return (
            (this.props.store.start) ?
                <Editor /> :
                <Welcome />
        );
    }
}

export { MainEditor };
