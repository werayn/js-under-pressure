import React from 'react';
import PropTypes from 'prop-types';
import {
    inject,
    observer,
} from 'mobx-react';

@inject('store')
@observer
class EnterButton extends React.Component {

    static propTypes = {
        store: PropTypes.any.isRequired,
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={ this.props.store.handleTestCode } className="EnterButton">
                {'Submit'}
            </button>
        );
    }
}

export { EnterButton };
