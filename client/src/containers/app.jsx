import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { MainEditor } from './main-editor.jsx';
import { LogScreen } from './log-screen.jsx';
import 'styles/index.scss';
import { observer } from 'mobx-react';

@inject('store')
@observer
class App extends React.Component {

    static propTypes = {
        store: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
        this.handleEnterQ = this.handleEnterQ.bind(this);
    }

    handleEnterQ(e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            console.log('ENTER BRO');
            console.log(this.props.store);
            this.props.store.startEndTest();
        }

        if (e.keyCode === 81 && e.ctrlKey) {
            console.log('skipped');
        }

    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleEnterQ);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEnterQ);
    }

    render () {

        return (
            <div>
                <MainEditor />
                <LogScreen />
            </div>
        );
    }
}

export { App };
