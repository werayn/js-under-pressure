import React from 'react';
import PropTypes from 'prop-types';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        start: PropTypes.isBoolean.isRequired,
        skip: PropTypes.isBoolean.isRequired,
        level: PropTypes.isNumber.isRequired,
    }

    render() {

        const Skip = (skip) => {
            if (skip) {
                return (
                    <h2>
                        {'You cannot skip now'}
                    </h2>);
            }
        };

        return (
            <div>
                <h1>
                    {' This is Welcome'}
                </h1>
                <Skip skip={ this.props.skip } />
                <h3>
                    { this.props.level }
                    { this.props.start }
                    { this.props.skip }
                </h3>
            </div>
        );
    }

}

export { Welcome };
