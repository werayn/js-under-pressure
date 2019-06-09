import React from 'react';
import PropTypes from 'prop-types';
import { Welcome } from './welcome/index.jsx';
import { Editor } from './editor/index.jsx';

class MainEditor extends React.Component {
    static propTypes = {
        start: PropTypes.isBoolean.isRequired,
        skip: PropTypes.isBoolean.isRequired,
        level: PropTypes.isNumber.isRequired,
    }

    constructor(props) {
        super(props);
    }

    render () {
        const {
            start,
        } = this.props;
        return (
            <div className="editor">
                {
                    start ? (
                        <Editor { ...this.props } />
                    ) : (
                        <Welcome { ...this.props } />
                    )
                }
            </div>
        );
    }
}

export { MainEditor };
