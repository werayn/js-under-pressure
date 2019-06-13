import React from 'react';
import PropTypes from 'prop-types';
import {
    inject,
} from 'mobx-react';

@inject('store')
class EnterButton extends React.Component {

    static propTypes = {
        store: PropTypes.any.isRequired,
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={ this.props.store.Submit() } className="Button EnterButton">
                {'Submit'}
            </button>
        );
    }
}

export { EnterButton };
