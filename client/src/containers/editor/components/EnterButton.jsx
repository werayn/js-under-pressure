import React from 'react';
import PropTypes from 'prop-types';
import {
    inject,
} from 'mobx-react';

@inject('store')
class EnterButton extends React.Component {

    static propTypes = {
        submit: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={ this.props.submit() } className="Button EnterButton">
                {'Submit'}
            </button>
        );
    }
}

export { EnterButton };
