import React from 'react';
import { PropTypes } from 'prop-types';

class Line extends React.Component {

    static propTypes = {
        content: PropTypes.string,
        layout: PropTypes.string,
    }

    static defaultProps = {
        content: '',
        layout: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            style: `log-line ${this.props.layout}`,
        };
    }

    render() {
        return (
            <div className={ this.state.style }>
                { this.state.content }
            </div>
        );
    }
}

export { Line };
